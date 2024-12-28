use cosmwasm_std::{Addr, Uint128};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Campaign {
    pub name: String,
    pub description: String,
    pub target: Uint128,
    pub total_donated: Uint128,
    pub owner: Addr,
}

pub const CAMPAIGN: Item<Campaign> = Item::new("campaign");
