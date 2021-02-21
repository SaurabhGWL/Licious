const update = {
    "title": "mdms Update",
    "description": "MDMS details for bulk operations",
    "type": "array",
    "minItems": 1,
    "items": 
      {
        "type": "object",
        "properties": {
          "uuid":{"type":"string"},
          "moduleName": { "type": "string", "maxLength": 50 },
          "filter": { "type": "string", "maxLength": 50 },
          "masters":{
            "type":"array","minItems": 1,"items": {
              "type": "object", "properties": {
                "uuid":{"type":"string"},
                "masterName": { "type": "string", "maxLength": 50 },
                "filter": { "type": "string", "maxLength": 50 },
                "data": { "type": "object" },
                "additionalInfo": { "type": "object" },
                "auditDetails": { "type": "object" },
                
              },
              "required": ["uuid", "data"]
            }
          },
          "additionalInfo": { "type": "object" },
          "auditDetails": { "type": "object" },
        },
        "required": ["uuid", "masters"]
        
      }
  }
  
  export default update;
  