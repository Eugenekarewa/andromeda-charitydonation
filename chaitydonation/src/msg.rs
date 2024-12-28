use cosmwasm_std::{Uint128}; // Removed unused import Binary
use cosmwasm_schema::QueryResponses; // Corrected import
use schemars::schema::RootSchema; // Corrected import for RootSchema
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub name: String,
    pub description: String,
    pub target: Uint128,
    pub kernel_address: Option<String>,
    pub owner: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum ExecuteMsg {
    Donate {},
    Withdraw { amount: Uint128 },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum QueryMsg {
    GetCampaignInfo {},
    GetCount {},  // Added GetCount variant
}

impl QueryResponses for QueryMsg {
    fn response_schemas_impl() -> BTreeMap<String, RootSchema> {
        let mut schemas = BTreeMap::new();
        schemas.insert("GetCampaignInfo".to_string(), RootSchema::default());
        schemas.insert("GetCount".to_string(), RootSchema::default());
        schemas
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct GetCampaignInfoResponse {
    pub name: String,
    pub description: String,
    pub target: Uint128,
    pub total_donated: Uint128,
    pub owner: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct GetCountResponse {
    pub count: u32,  // Define the expected response structure
}
