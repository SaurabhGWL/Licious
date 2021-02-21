const mdms = {
  "title": "mdms",
  "description": "MDMS details for bulk operations",
  "type": "array",
  "minItems": 1,
  "items": 
    {
      "type": "object",
      "properties": {
        "moduleName": { "type": "string", "maxLength": 50 },
        "filter": { "type": "string", "maxLength": 50 },
        "masters":{
          "type":"array","minItems": 1,"items": {
            "type": "object", "properties": {
              "masterName": { "type": "string", "maxLength": 50 },
              "filter": { "type": "string", "maxLength": 50 },
              "data": { "type": "object" },
              "additionalInfo": { "type": "object" },
              "auditDetails": { "type": "object" },
              
            }
          }
        },
        "additionalInfo": { "type": "object" },
        "auditDetails": { "type": "object" },
      },
      "required": ["moduleName", "masters"]
      
    }
}

export default mdms;
