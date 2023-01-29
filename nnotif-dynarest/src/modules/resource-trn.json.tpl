{
  "type": "Transaction",
  "status": "/Coding/transaction-statuses?code=active",
  "mode": "/Coding/transaction-modes?code=sync",
  "items": [
    {
      "method": "POST",
      "url": "/Route",
      "body": {
        "type": "Route",
        "method": "POST",
        "path": [
          {
            "name": "_type",
            "code": "/Coding/wellknown-params?code=type",
            "value": "{{type}}"
          }
        ],
        "name": "create-{{typelc}}",
        "code": "/Coding/nerves?code=create",
        "resource": "/Resource/{{typelc}}"
      }
    },
    {
      "method": "POST",
      "url": "/Route",
      "body": {
        "type": "Route",
        "method": "GET",
        "path": [
          {
            "name": "_type",
            "code": "/Coding/wellknown-params?code=type",
            "value": "{{type}}"
          },
          {
            "name": "_id",
            "code": "/Coding/wellknown-params?code=id"
          }
        ],
        "name": "read-{{typelc}}",
        "code": "/Coding/nerves?code=read",
        "resource": "/Resource/{{typelc}}"
      }
    },
    {
      "method": "POST",
      "url": "/Route",
      "body": {
        "type": "Route",
        "method": "PUT",
        "path": [
          {
            "name": "_type",
            "code": "/Coding/wellknown-params?code=type",
            "value": "{{type}}"
          },
          {
            "name": "_id",
            "code": "/Coding/wellknown-params?code=id"
          }
        ],
        "name": "upsert-{{typelc}}",
        "code": "/Coding/nerves?code=upsert",
        "resource": "/Resource/{{typelc}}"
      }
    },
    {
      "method": "POST",
      "url": "/Route",
      "body": {
        "type": "Route",
        "method": "DELETE",
        "path": [
          {
            "name": "_type",
            "code": "/Coding/wellknown-params?code=type",
            "value": "{{type}}"
          },
          {
            "name": "_id",
            "code": "/Coding/wellknown-params?code=id"
          }
        ],
        "name": "delete-{{typelc}}",
        "code": "/Coding/nerves?code=delete",
        "resource": "/Resource/{{typelc}}"
      }
    }
  ]
}