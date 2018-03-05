export class PocoDataMock {
    businessTypes4Count : object[]  = 
        [
            {
                "$type": "BP.IST.Power.PDM.Domain.BusinessType.BusinessType, BP.IST.Power.PDM",
                "businessTypeCd": "BP",
                "businessTypeDesc": "BILATERAL",
                "lastUpdateDtm": "2017-10-03T16:51:24",
                "lastUpdateBy": "PDM"
            },
            {
                "$type": "BP.IST.Power.PDM.Domain.BusinessType.BusinessType, BP.IST.Power.PDM",
                "businessTypeCd": "GEN_ISO",
                "businessTypeDesc": "ISO GENERATION",
                "lastUpdateDtm": "2017-09-11T16:09:47",
                "lastUpdateBy": "SVC_ETL_RW"
            },
            {
                "$type": "BP.IST.Power.PDM.Domain.BusinessType.BusinessType, BP.IST.Power.PDM",
                "businessTypeCd": "GEN_NON_ISO",
                "businessTypeDesc": "OUTSIDE ISO GENERATION",
                "lastUpdateDtm": "2017-09-11T16:09:47",
                "lastUpdateBy": "SVC_ETL_RW"
            },
            {
                "$type": "BP.IST.Power.PDM.Domain.BusinessType.BusinessType, BP.IST.Power.PDM",
                "businessTypeCd": "REP",
                "businessTypeDesc": "RETAIL ENERGY LOAD",
                "lastUpdateDtm": "2017-09-11T16:09:47",
                "lastUpdateBy": "SVC_ETL_RW"
            }
        ];
    
    regulatoryMktTimezone5Count : object[] = 
    [
        {
          "$type": "BP.IST.Power.PDM.Domain.RgltMktTimezone.RgltMktTimezone, BP.IST.Power.PDM",
          "rgltMktTimezoneKey": "58ED2F159F6652DCE0530100007FDB13",
          "marketKey": "56E6424108C660B2E0530100007FD808",
          "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
          "regulatoryTimezoneKey": "58ED27468FA85219E0530100007F8477",
          "lastUpdateDtm": "2017-09-11T16:11:49",
          "lastUpdateBy": "SVC_ETL_RW"
        },
        {
          "$type": "BP.IST.Power.PDM.Domain.RgltMktTimezone.RgltMktTimezone, BP.IST.Power.PDM",
          "rgltMktTimezoneKey": "58ED2F15DE3352DEE0530100007F1CAB",
          "marketKey": "56E6424108C760B2E0530100007FD808",
          "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
          "regulatoryTimezoneKey": "58ED27468FAA5219E0530100007F8477",
          "lastUpdateDtm": "2017-09-11T16:11:49",
          "lastUpdateBy": "SVC_ETL_RW"
        },
        {
          "$type": "BP.IST.Power.PDM.Domain.RgltMktTimezone.RgltMktTimezone, BP.IST.Power.PDM",
          "rgltMktTimezoneKey": "590AEAA18E5C640EE0530100007F6291",
          "marketKey": "56E6424108C960B2E0530100007FD808",
          "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
          "regulatoryTimezoneKey": "58ED27468FAA5219E0530100007F8477",
          "lastUpdateDtm": "2017-09-13T03:40:09",
          "lastUpdateBy": "SVC_ETL_RW"
        },
        {
          "$type": "BP.IST.Power.PDM.Domain.RgltMktTimezone.RgltMktTimezone, BP.IST.Power.PDM",
          "rgltMktTimezoneKey": "5ACFCD039D0E6880E0530100007F118F",
          "marketKey": "56E6424108C860B2E0530100007FD808",
          "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
          "regulatoryTimezoneKey": "58ED27468FAA5219E0530100007F8477",
          "lastUpdateDtm": "2017-10-05T15:58:52",
          "lastUpdateBy": "SVC_ETL_RW"
        },
        {
          "$type": "BP.IST.Power.PDM.Domain.RgltMktTimezone.RgltMktTimezone, BP.IST.Power.PDM",
          "rgltMktTimezoneKey": "5B46B54D0939331EE0530100007F0D30",
          "marketKey": "56E6424108CB60B2E0530100007FD808",
          "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
          "regulatoryTimezoneKey": "5B46B54D093A331EE0530100007F0D30",
          "lastUpdateDtm": "2017-10-11T14:04:59",
          "lastUpdateBy": "PDM"
        }
      ];

        regulatoryReport : object = [
        {
            "regulatoryReportKey": "58ED2863E8A65224E0530100007F53EE",
            "regulatoryReportCd": "EQR",
            "regulatoryReportDesc": "FERC Electric Quarterly Reports",
            "lastUpdateDtm": "2017-09-11T16:09:56",
            "lastUpdateBy": "SVC_ETL_RW"
        }];

        timeZone : object = [
        {
            "timezoneKey": "58ED27468FAA5219E0530100007F8477",
            "timezoneCd": "EP",
            "lastUpdateDtm": "2017-09-11T16:09:38",
            "lastUpdateBy": "SVC_ETL_RW"
        }];

        market : object = [
        {
            "marketKey": "56E6424108C960B2E0530100007FD808",
            "nmMarketCd": "NESMD",
            "epsMarketSeq": 6,
            "marketName": "New England nMarket Power ",
            "defaultTimezoneCd": "EPT",
            "defaultCurrencyCd": "USD",
            "defaultQuantityUomCd": "MW",
            "defaultTimezoneTechName": "EST5EDT",
            "peakMinuteStartNum": 420.0,
            "peakMinuteEndNum": 1380.0,
            "saturdayOnPeakFlag": false,
            "recordStartDtm": "1900-01-01T00:00:00",
            "recordEndDtm": "4000-12-31T00:00:00",
            "recordLoadDtm": "2017-08-23T18:47:53"
        }];
}