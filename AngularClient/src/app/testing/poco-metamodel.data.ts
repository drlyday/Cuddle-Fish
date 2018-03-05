import { PocoBaseMetadata } from "../metadata/poco-base";

export class PocoMetadataMock
{
  businessType: PocoBaseMetadata = 
    {
      name: "businessType",
      type: "BusinessType",
      label: "Business Type",
      description: "Business Type",
      selectorValue: "businessTypeCd",
      primaryKey: "businessTypeCd",
      actions: [],
      metadata : 
          [
            {
              value: "businessTypeCd",
              key: 'true',
              label: "Business Type Cd",
              description: "Business Type Cd",
              type: "Text",
              required: 'true',
              order: '0',
              gridshow: 'true',
              color: '',
              enumeration: null,
              reference: null
            },
            {
              value: "businessTypeDesc",
              key: 'false',
              label: "Business Type Desc",
              description: "Business Type Desc",
              type: "Text",
              required: 'true',
              order: '1',
              gridshow: 'true',
              color: null,
              enumeration: null,
              reference: null
            },
            {
              value: "lastUpdateDtm",
              key: 'false',
              label: "Last Update Dtm",
              description: "Last Update Dtm",
              type: "DateTime",
              required: 'true',
              order: '2',
              gridshow: 'true',
              color: null,
              enumeration: null,
              reference: null
            },
            {
              value: "lastUpdateBy",
              key: 'false',
              label: "Last Update By",
              description: "Last Update By",
              type: "Text",
              required: 'true',
              order: '3',
              gridshow: 'true',
              color: null,
              enumeration: null,
              reference: null
            }
        ]
    };

    regulatoryReport = 
    {
      name: "regulatoryReport",
      type: "RegulatoryReport",
      label: "Regulatory Report",
      description: "Regulatory Report",
      selectorValue: "regulatoryReportCd",
      primaryKey: "regulatoryReportKey",
      actions: null,
      metadata: [
        {
          value: "regulatoryReportKey",
          key: 'true',
          label: "Regulatory Report Key",
          description: "Regulatory Report Key",
          type: "Text",
          required: 'true',
          order: 0,
          gridshow: 'true',
          color: null,
          enumeration: null,
          reference: null
        },
        {
          value: "regulatoryReportCd",
          key: 'false',
          label: "Regulatory Report Cd",
          description: "Regulatory Report Cd",
          type: "Text",
          required: 'true',
          order: 1,
          gridshow: 'true',
          color: null,
          enumeration: null,
          reference: null
        },
        {
          value: "regulatoryReportDesc",
          key:'false',
          label: "Regulatory Report Desc",
          description: "Regulatory Report Desc",
          type: "Text",
          required: 'true',
          order: 2,
          gridshow: 'true',
          color: null,
          enumeration: null,
          reference: null
        },
        {
          value: "lastUpdateDtm",
          key:'false',
          label: "Last Update Dtm",
          description: "Last Update Dtm",
          type: "DateTime",
          required: 'true',
          order: 3,
          gridshow: 'true',
          color: null,
          enumeration: null,
          reference: null
        },
        {
          value: "lastUpdateBy",
          key: 'false',
          label: "Last Update By",
          description: "Last Update By",
          type: "Text",
          required: 'true',
          order: 4,
          gridshow: 'true',
          color: null,
          enumeration: null,
          reference: null
        }
      ]
    };

    timezone =     
    {
      "name": "timezone",
      "type": "Timezone",
      "label": "Timezone",
      "description": "Timezone",
      "selectorValue": "timezoneCd",
      "primaryKey": "timezoneKey",
      "actions": null,
      "metadata": [
        {
          "value": "timezoneKey",
          "key": true,
          "label": "Timezone Key",
          "description": "Timezone Key",
          "type": "Text",
          "required": true,
          "order": 0,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "timezoneCd",
          "key": 'false',
          "label": "Timezone Cd",
          "description": "Timezone Cd",
          "type": "Text",
          "required": true,
          "order": 1,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "lastUpdateDtm",
          "key": 'false',
          "label": "Last Update Dtm",
          "description": "Last Update Dtm",
          "type": "DateTime",
          "required": true,
          "order": 2,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "lastUpdateBy",
          "key": 'false',
          "label": "Last Update By",
          "description": "Last Update By",
          "type": "Text",
          "required": true,
          "order": 3,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        }
      ]
    };

    dimMarket = 
    {
      "name": "dimMarket",
      "type": "DimMarket",
      "label": "Dim Market",
      "description": "Dim Market",
      "selectorValue": "marketName",
      "primaryKey": "marketKey",
      "actions": null,
      "metadata": [
        {
          "value": "marketKey",
          "key": true,
          "label": "Market Key",
          "description": "Market Key",
          "type": "Text",
          "required": true,
          "order": 0,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "nmMarketCd",
          "key": 'false',
          "label": "Nm Market Cd",
          "description": "Nm Market Cd",
          "type": "Enumeration",
          "required": true,
          "order": 1,
          "gridshow": true,
          "color": null,
          "enumeration": [
            "CA",
            "MW",
            "NESMD",
            "NY",
            "PJM",
            "TX"
          ],
          "reference": null
        },
        {
          "value": "epsMarketSeq",
          "key": 'false',
          "label": "Eps Market Seq",
          "description": "Eps Market Seq",
          "type": "Integer",
          "required": true,
          "order": 2,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "marketName",
          "key": 'false',
          "label": "Market Name",
          "description": "Market Name",
          "type": "Text",
          "required": true,
          "order": 3,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "defaultTimezoneCd",
          "key": 'false',
          "label": "Default Timezone Cd",
          "description": "Default Timezone Cd",
          "type": "Text",
          "required": true,
          "order": 4,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "defaultCurrencyCd",
          "key": 'false',
          "label": "Default Currency Cd",
          "description": "Default Currency Cd",
          "type": "Text",
          "required": true,
          'order': 5,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "defaultQuantityUomCd",
          "key": 'false',
          "label": "Default Quantity Uom Cd",
          "description": "Default Quantity Uom Cd",
          "type": "Text",
          "required": true,
          "order": 6,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "defaultTimezoneTechName",
          "key": 'false',
          "label": "Default Timezone Tech Name",
          "description": "Default Timezone Tech Name",
          "type": "Text",
          "required": true,
          "order": 7,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "peakMinuteStartNum",
          "key": 'false',
          "label": "Peak Minute Start Num",
          "description": "Peak Minute Start Num",
          "type": "Real",
          "required": true,
          "order": 8,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "peakMinuteEndNum",
          "key": 'false',
          "label": "Peak Minute End Num",
          "description": "Peak Minute End Num",
          "type": "Real",
          "required": true,
          "order": 9,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "saturdayOnPeakFlag",
          "key": 'false',
          "label": "Saturday On Peak Flag",
          "description": "Saturday On Peak Flag",
          "type": "Boolean",
          "required": 'false',
          "order": 10,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "recordStartDtm",
          "key": 'false',
          "label": "Record Start Dtm",
          "description": "Record Start Dtm",
          "type": "DateTime",
          "required": true,
          "order": 11,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "recordEndDtm",
          "key": 'false',
          "label": "Record End Dtm",
          "description": "Record End Dtm",
          "type": "DateTime",
          "required": true,
          "order": 12,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "recordLoadDtm",
          "key": 'false',
          "label": "Record Load Dtm",
          "description": "Record Load Dtm",
          "type": "DateTime",
          "required": true,
          "order": 13,
          "gridshow": true,
          "color": null,
          "enumeration": null,
          "reference": null
        }
      ]
    }

    rgltMktTimezone =
    {
      "name": "rgltMktTimezone",
      "type": "RgltMktTimezone",
      "label": "Rglt Mkt Timezone",
      "description": "Rglt Mkt Timezone",
      "selectorValue": "",
      "primaryKey": "rgltMktTimezoneKey",
      "actions": null,
      "metadata": [
        {
          "value": "rgltMktTimezoneKey",
          "key": 'true',
          "label": "Rglt Mkt Timezone Key",
          "description": "Rglt Mkt Timezone Key",
          "type": "Text",
          "required": 'true',
          "order": '0',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "marketKey",
          "key": 'false',
          "label": "Market Key",
          "description": "Market Key",
          "type": "Reference",
          "required": 'true',
          "order": '1',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": "DimMarket"
        },
        {
          "value": "regulatoryReportKey",
          "key": 'false',
          "label": "Regulatory Report Key",
          "description": "Regulatory Report Key",
          "type": "Reference",
          "required": 'true',
          "order": '2',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": "RegulatoryReport"
        },
        {
          "value": "regulatoryTimezoneKey",
          "key": 'false',
          "label": "Regulatory Timezone Key",
          "description": "Regulatory Timezone Key",
          "type": "Reference",
          "required": 'true',
          "order": '3',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": "Timezone"
        },
        {
          "value": "lastUpdateDtm",
          "key": 'false',
          "label": "Last Update Dtm",
          "description": "Last Update Dtm",
          "type": "DateTime",
          "required": 'true',
          "order": '4',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": null
        },
        {
          "value": "lastUpdateBy",
          "key": 'false',
          "label": "Last Update By",
          "description": "Last Update By",
          "type": "Text",
          "required": 'true',
          "order": '5',
          "gridshow": 'true',
          "color": null,
          "enumeration": null,
          "reference": null
        }
      ]
    };

    // EOF
}
