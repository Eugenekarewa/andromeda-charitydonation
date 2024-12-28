use cosmwasm_std::{entry_point, DepsMut, Env, MessageInfo, Response, Binary, Uint128, Deps, to_json_binary};
use crate::msg::{ExecuteMsg, QueryMsg, GetCampaignInfoResponse};
use crate::ContractError;
use crate::state::CAMPAIGN;
use andromeda_std::common::context::ExecuteContext; // Adjust if this path is incorrect

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    let ctx = ExecuteContext::new(deps, info, env);
    handle_execute(ctx, msg)
}

pub fn handle_execute(
    ctx: ExecuteContext,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Donate {} => execute::donate(ctx),
        ExecuteMsg::Withdraw { amount } => execute::withdraw(ctx, amount),
        // Removed the unreachable pattern `_`
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> Result<Binary, ContractError> {
    match msg {
        QueryMsg::GetCampaignInfo {} => Ok(to_json_binary(&query::campaign_info(deps)?)?),
        QueryMsg::GetCount {} => todo!(), // Placeholder for GetCount implementation
        // Removed the GetCount variant
    }
}

pub mod execute {
    use super::*;

    pub fn donate(ctx: ExecuteContext) -> Result<Response, ContractError> {
        let ExecuteContext { deps, info, .. } = ctx;
        let mut campaign = CAMPAIGN.load(deps.storage)?;
        let donation_amount: Uint128 = info.funds.iter().map(|coin| coin.amount).sum();

        if donation_amount.is_zero() {
            return Err(ContractError::Std(cosmwasm_std::StdError::generic_err(
                "Donation amount must be greater than zero",
            )));
        }

        campaign.total_donated += donation_amount;
        CAMPAIGN.save(deps.storage, &campaign)?;

        Ok(Response::new()
            .add_attribute("action", "donate")
            .add_attribute("donor", info.sender.to_string())
            .add_attribute("new_total_donated", campaign.total_donated.to_string()))
    }

    pub fn withdraw(ctx: ExecuteContext, amount: Uint128) -> Result<Response, ContractError> {
        let ExecuteContext { deps, info, .. } = ctx;

        let mut campaign = CAMPAIGN.load(deps.storage)?;
        if info.sender != campaign.owner {
            return Err(ContractError::Unauthorized {});
        }

        if campaign.total_donated < amount {
            return Err(ContractError::Std(cosmwasm_std::StdError::generic_err(
                "Insufficient funds to withdraw",
            )));
        }

        campaign.total_donated -= amount;
        CAMPAIGN.save(deps.storage, &campaign)?;

        Ok(Response::new()
            .add_attribute("action", "withdraw")
            .add_attribute("owner", info.sender.to_string())
            .add_attribute("withdrawn_amount", amount.to_string()))
    }
}

pub mod query {
    use super::*;

    pub fn campaign_info(deps: Deps) -> Result<GetCampaignInfoResponse, ContractError> {
        let campaign = CAMPAIGN.load(deps.storage)?;
        Ok(GetCampaignInfoResponse {
            name: campaign.name,
            description: campaign.description,
            target: campaign.target,
            total_donated: campaign.total_donated,
            owner: campaign.owner.to_string(),
        })
    }
}
