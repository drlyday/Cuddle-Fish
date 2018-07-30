import { IEndPointMetadata } from '../metadata/endpointMetadata';

export class EndpointData {
    endpoints: IEndPointMetadata[] =
    [
      {
          'name': 'businessType',
          'group': 'Regulatory',
          'label': 'Business Type',
          'icon': null,
          'type': 'Business Type',
          'description': 'Business Type',
          'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessTypeUi',
          'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessType',
          'actions' : []
      },
      {
        'name': 'regulatoryReport',
        'group': 'Regulatory',
        'label': 'Regulatory Report',
        'type': 'RegulatoryReport',
        'icon': null,
        'description': 'Regulatory Report',
        'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryReportUi',
        'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryReport',
        'actions' : []
      },
      {
        'name': 'rgltMktTimezone',
        'group': 'Regulatory',
        'label': 'Rglt Mkt Timezone',
        'type': 'RgltMktTimezone',
        'icon': null,
        'description': 'Rglt Mkt Timezone',
        'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltMktTimezoneUi',
        'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltMktTimezone',
        'actions' : []
      },
      {
        'name': 'dimMarket',
        'group': 'Nmarket',
        'label': 'Dim Market',
        'type': 'DimMarket',
        'icon': null,
        'description': 'Dim Market',
        'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMarketUi',
        'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMarket',
        'actions' : []
      },
      {
        'name': 'timezone',
        'group': 'Unknown',
        'label': 'Timezone',
        'type': 'Timezone',
        'icon': null,
        'description': 'Timezone',
        'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/timezoneUi',
        'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/timezone',
        'actions' : []
      }
    ];

    // endpoints2: IEndPointMetadata[] = [{
    //       'name': 'businessType',
    //       'group': 'Regulatory',
    //       'label': 'Business Type',
    //       'type': 'BusinessType',
    //       'icon': null,
    //       'description': 'Business Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/businessType',
    //       'actions' : []
    //     },
    //     {
    //       'name': 'compTypeAttribute',
    //       'group': 'Nmarket',
    //       'label': 'Comp Type Attribute',
    //       'type': 'CompTypeAttribute',
    //       'icon': null,
    //       'description': 'Comp Type Attribute',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/compTypeAttributeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/compTypeAttribute'
    //     },
    //     {
    //       'name': 'dimChargeType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Charge Type',
    //       'type': 'DimChargeType',
    //       'icon': null,
    //       'description': 'Dim Charge Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimChargeTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimChargeType'
    //     },
    //     {
    //       'name': 'dimClrgCode',
    //       'group': 'Nmarket',
    //       'label': 'Dim Clrg Code',
    //       'type': 'DimClrgCode',
    //       'icon': null,
    //       'description': 'Dim Clrg Code',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimClrgCodeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimClrgCode'
    //     },
    //     {
    //       'name': 'dimCode',
    //       'group': 'Nmarket',
    //       'label': 'Dim Code',
    //       'type': 'DimCode',
    //       'icon': null,
    //       'description': 'Dim Code',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCodeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCode'
    //     },
    //     {
    //       'name': 'dimCompType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Comp Type',
    //       'type': 'DimCompType',
    //       'icon': null,
    //       'description': 'Dim Comp Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCompTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCompType'
    //     },
    //     {
    //       'name': 'dimCounterparty',
    //       'group': 'Nmarket',
    //       'label': 'Dim Counterparty',
    //       'type': 'DimCounterparty',
    //       'icon': null,
    //       'description': 'Dim Counterparty',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCounterpartyUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimCounterparty'
    //     },
    //     {
    //       'name': 'dimMarket',
    //       'group': 'Nmarket',
    //       'label': 'Dim Market',
    //       'type': 'DimMarket',
    //       'icon': null,
    //       'description': 'Dim Market',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMarketUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMarket'
    //     },
    //     {
    //       'name': 'dimMeterDataType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Meter Data Type',
    //       'type': 'DimMeterDataType',
    //       'icon': null,
    //       'description': 'Dim Meter Data Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMeterDataTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimMeterDataType'
    //     },
    //     {
    //       'name': 'dimPriceType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Price Type',
    //       'type': 'DimPriceType',
    //       'icon': null,
    //       'description': 'Dim Price Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimPriceTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimPriceType'
    //     },
    //     {
    //       'name': 'dimPtcpt',
    //       'group': 'Nmarket',
    //       'label': 'Dim Ptcpt',
    //       'type': 'DimPtcpt',
    //       'icon': null,
    //       'description': 'Dim Ptcpt',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimPtcptUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimPtcpt'
    //     },
    //     {
    //       'name': 'dimSchdCmdty',
    //       'group': 'Nmarket',
    //       'label': 'Dim Schd Cmdty',
    //       'type': 'DimSchdCmdty',
    //       'icon': null,
    //       'description': 'Dim Schd Cmdty',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdCmdtyUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdCmdty'
    //     },
    //     {
    //       'name': 'dimSchdCmdtySubType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Schd Cmdty Sub Type',
    //       'type': 'DimSchdCmdtySubType',
    //       'icon': null,
    //       'description': 'Dim Schd Cmdty Sub Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdCmdtySubTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdCmdtySubType'
    //     },
    //     {
    //       'name': 'dimSchdType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Schd Type',
    //       'type': 'DimSchdType',
    //       'icon': null,
    //       'description': 'Dim Schd Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSchdType'
    //     },
    //     {
    //       'name': 'dimSrvcType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Srvc Type',
    //       'type': 'DimSrvcType',
    //       'icon': null,
    //       'description': 'Dim Srvc Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSrvcTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimSrvcType'
    //     },
    //     {
    //       'name': 'dimStatus',
    //       'group': 'Nmarket',
    //       'label': 'Dim Status',
    //       'type': 'DimStatus',
    //       'icon': null,
    //       'description': 'Dim Status',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimStatusUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimStatus'
    //     },
    //     {
    //       'name': 'dimStmntType',
    //       'group': 'Nmarket',
    //       'label': 'Dim Stmnt Type',
    //       'type': 'DimStmntType',
    //       'icon': null,
    //       'description': 'Dim Stmnt Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimStmntTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimStmntType'
    //     },
    //     {
    //       'name': 'dimTxPt',
    //       'group': 'Nmarket',
    //       'label': 'Dim Tx Pt',
    //       'type': 'DimTxPt',
    //       'icon': null,
    //       'description': 'Dim Tx Pt',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimTxPtUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/dimTxPt'
    //     },
    //     {
    //       'name': 'epsCounterpartyPartcptXref',
    //       'group': 'Unknown',
    //       'label': 'Eps Counterparty Partcpt Xref',
    //       'type': 'EpsCounterpartyPartcptXref',
    //       'icon': null,
    //       'description': 'Eps Counterparty Partcpt Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsCounterpartyPartcptXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsCounterpartyPartcptXref'
    //     },
    //     {
    //       'name': 'epsCurveDefinitions',
    //       'group': 'Unknown',
    //       'label': 'Eps Curve Definitions',
    //       'type': 'EpsCurveDefinitions',
    //       'icon': null,
    //       'description': 'Eps Curve Definitions',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsCurveDefinitionsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsCurveDefinitions'
    //     },
    //     {
    //       'name': 'epsRepCounterpartyXref',
    //       'group': 'Unknown',
    //       'label': 'Eps Rep Counterparty Xref',
    //       'type': 'EpsRepCounterpartyXref',
    //       'icon': null,
    //       'description': 'Eps Rep Counterparty Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsRepCounterpartyXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/epsRepCounterpartyXref'
    //     },
    //     {
    //       'name': 'eqrContracts',
    //       'group': 'Eqr',
    //       'label': 'Eqr Contracts',
    //       'type': 'EqrContracts',
    //       'icon': null,
    //       'description': 'Eqr Contracts',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrContractsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrContracts'
    //     },
    //     {
    //       'name': 'eqrFiler',
    //       'group': 'Eqr',
    //       'label': 'Eqr Filer',
    //       'type': 'EqrFiler',
    //       'icon': null,
    //       'description': 'Eqr Filer',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFilerUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFiler'
    //     },
    //     {
    //       'name': 'eqrFiling',
    //       'group': 'Eqr',
    //       'label': 'Eqr Filing',
    //       'type': 'EqrFiling',
    //       'icon': null,
    //       'description': 'Eqr Filing',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFilingUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFiling'
    //     },
    //     {
    //       'name': 'eqrFilingSet',
    //       'group': 'Eqr',
    //       'label': 'Eqr Filing Set',
    //       'type': 'EqrFilingSet',
    //       'icon': null,
    //       'description': 'Eqr Filing Set',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFilingSetUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrFilingSet'
    //     },
    //     {
    //       'name': 'eqrTransactions',
    //       'group': 'Eqr',
    //       'label': 'Eqr Transactions',
    //       'type': 'EqrTransactions',
    //       'icon': null,
    //       'description': 'Eqr Transactions',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrTransactionsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrTransactions'
    //     },
    //     {
    //       'name': 'eqrWorkflow',
    //       'group': 'Eqr',
    //       'label': 'Eqr Workflow',
    //       'type': 'EqrWorkflow',
    //       'icon': null,
    //       'description': 'Eqr Workflow',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrWorkflowUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/eqrWorkflow'
    //     },
    //     {
    //       'name': 'jobLog',
    //       'group': 'JobStatus',
    //       'label': 'Job Log',
    //       'type': 'JobLog',
    //       'icon': null,
    //       'description': 'Job Log',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/jobLogUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/jobLog'
    //     },
    //     {
    //       'name': 'jobStatus',
    //       'group': 'JobStatus',
    //       'label': 'Job Status',
    //       'type': 'JobStatus',
    //       'icon': null,
    //       'description': 'Job Status',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/jobStatusUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/jobStatus'
    //     },
    //     {
    //       'name': 'marketHolidayCalendar',
    //       'group': 'Unknown',
    //       'label': 'Market Holiday Calendar',
    //       'type': 'MarketHolidayCalendar',
    //       'icon': null,
    //       'description': 'Market Holiday Calendar',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/marketHolidayCalendarUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/marketHolidayCalendar'
    //     },
    //     {
    //       'name': 'nmChangeSttlControl',
    //       'group': 'Nmarket',
    //       'label': 'Nm Change Sttl Control',
    //       'type': 'NmChangeSttlControl',
    //       'icon': null,
    //       'description': 'Nm Change Sttl Control',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmChangeSttlControlUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmChangeSttlControl'
    //     },
    //     {
    //       'name': 'nmChangeTxnControl',
    //       'group': 'Nmarket',
    //       'label': 'Nm Change Txn Control',
    //       'type': 'NmChangeTxnControl',
    //       'icon': null,
    //       'description': 'Nm Change Txn Control',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmChangeTxnControlUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmChangeTxnControl'
    //     },
    //     {
    //       'name': 'nmHistSttlLoadControl',
    //       'group': 'Nmarket',
    //       'label': 'Nm Hist Sttl Load Control',
    //       'type': 'NmHistSttlLoadControl',
    //       'icon': null,
    //       'description': 'Nm Hist Sttl Load Control',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmHistSttlLoadControlUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmHistSttlLoadControl'
    //     },
    //     {
    //       'name': 'nmMeterData',
    //       'group': 'Nmarket',
    //       'label': 'Nm Meter Data',
    //       'type': 'NmMeterData',
    //       'icon': null,
    //       'description': 'Nm Meter Data',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmMeterDataUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmMeterData'
    //     },
    //     {
    //       'name': 'nmPrice',
    //       'group': 'Nmarket',
    //       'label': 'Nm Price',
    //       'type': 'NmPrice',
    //       'icon': null,
    //       'description': 'Nm Price',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmPriceUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmPrice'
    //     },
    //     {
    //       'name': 'nmSchedule',
    //       'group': 'Nmarket',
    //       'label': 'Nm Schedule',
    //       'type': 'NmSchedule',
    //       'icon': null,
    //       'description': 'Nm Schedule',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmScheduleUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmSchedule'
    //     },
    //     {
    //       'name': 'nmStmntComp',
    //       'group': 'Nmarket',
    //       'label': 'Nm Stmnt Comp',
    //       'type': 'NmStmntComp',
    //       'icon': null,
    //       'description': 'Nm Stmnt Comp',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmStmntCompUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmStmntComp'
    //     },
    //     {
    //       'name': 'nmStmntDetail',
    //       'group': 'Nmarket',
    //       'label': 'Nm Stmnt Detail',
    //       'type': 'NmStmntDetail',
    //       'icon': null,
    //       'description': 'Nm Stmnt Detail',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmStmntDetailUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmStmntDetail'
    //     },
    //     {
    //       'name': 'nmSttlLoadControl',
    //       'group': 'Nmarket',
    //       'label': 'Nm Sttl Load Control',
    //       'type': 'NmSttlLoadControl',
    //       'icon': null,
    //       'description': 'Nm Sttl Load Control',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmSttlLoadControlUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/nmSttlLoadControl'
    //     },
    //     {
    //       'name': 'pdmTest',
    //       'group': 'Unknown',
    //       'label': 'Pdm Test',
    //       'type': 'PdmTest',
    //       'icon': null,
    //       'description': 'Pdm Test',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/pdmTestUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/pdmTest'
    //     },
    //     {
    //       'name': 'prrExcludedCounterparties',
    //       'group': 'Unknown',
    //       'label': 'Prr Excluded Counterparties',
    //       'type': 'PrrExcludedCounterparties',
    //       'icon': null,
    //       'description': 'Prr Excluded Counterparties',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/prrExcludedCounterpartiesUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/prrExcludedCounterparties'
    //     },
    //     {
    //       'name': 'ptcptBusinessType',
    //       'group': 'Unknown',
    //       'label': 'Ptcpt Business Type',
    //       'type': 'PtcptBusinessType',
    //       'icon': null,
    //       'description': 'Ptcpt Business Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/ptcptBusinessTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/ptcptBusinessType'
    //     },
    //     {
    //       'name': 'qrtzBlobTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Blob Triggers',
    //       'type': 'QrtzBlobTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Blob Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzBlobTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzBlobTriggers'
    //     },
    //     {
    //       'name': 'qrtzCalendars',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Calendars',
    //       'type': 'QrtzCalendars',
    //       'icon': null,
    //       'description': 'Qrtz Calendars',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzCalendarsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzCalendars'
    //     },
    //     {
    //       'name': 'qrtzCronTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Cron Triggers',
    //       'type': 'QrtzCronTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Cron Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzCronTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzCronTriggers'
    //     },
    //     {
    //       'name': 'qrtzFiredTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Fired Triggers',
    //       'type': 'QrtzFiredTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Fired Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzFiredTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzFiredTriggers'
    //     },
    //     {
    //       'name': 'qrtzJobDetails',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Job Details',
    //       'type': 'QrtzJobDetails',
    //       'icon': null,
    //       'description': 'Qrtz Job Details',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzJobDetailsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzJobDetails'
    //     },
    //     {
    //       'name': 'qrtzLocks',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Locks',
    //       'type': 'QrtzLocks',
    //       'icon': null,
    //       'description': 'Qrtz Locks',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzLocksUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzLocks',
    //       'actions' : []
    //     },
    //     {
    //       'name': 'qrtzPausedTriggerGrps',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Paused Trigger Grps',
    //       'type': 'QrtzPausedTriggerGrps',
    //       'icon': null,
    //       'description': 'Qrtz Paused Trigger Grps',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzPausedTriggerGrpsUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzPausedTriggerGrps',
    //       'actions' : []
    //     },
    //     {
    //       'name': 'qrtzSchedulerState',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Scheduler State',
    //       'type': 'QrtzSchedulerState',
    //       'icon': null,
    //       'description': 'Qrtz Scheduler State',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSchedulerStateUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSchedulerState'
    //     },
    //     {
    //       'name': 'qrtzSimpleTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Simple Triggers',
    //       'type': 'QrtzSimpleTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Simple Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSimpleTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSimpleTriggers'
    //     },
    //     {
    //       'name': 'qrtzSimpropTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Simprop Triggers',
    //       'type': 'QrtzSimpropTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Simprop Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSimpropTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzSimpropTriggers'
    //     },
    //     {
    //       'name': 'qrtzTriggers',
    //       'group': 'Unknown',
    //       'label': 'Qrtz Triggers',
    //       'type': 'QrtzTriggers',
    //       'icon': null,
    //       'description': 'Qrtz Triggers',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzTriggersUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/qrtzTriggers'
    //     },
    //     {
    //       'name': 'regulatoryBalAuth',
    //       'group': 'Regulatory',
    //       'label': 'Regulatory Bal Auth',
    //       'type': 'RegulatoryBalAuth',
    //       'icon': null,
    //       'description': 'Regulatory Bal Auth',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryBalAuthUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryBalAuth'
    //     },
    //     {
    //       'name': 'regulatoryFilingType',
    //       'group': 'Regulatory',
    //       'label': 'Regulatory Filing Type',
    //       'type': 'RegulatoryFilingType',
    //       'icon': null,
    //       'description': 'Regulatory Filing Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryFilingTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryFilingType'
    //     },
    //     {
    //       'name': 'regulatoryHub',
    //       'group': 'Regulatory',
    //       'label': 'Regulatory Hub',
    //       'type': 'RegulatoryHub',
    //       'icon': null,
    //       'description': 'Regulatory Hub',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryHubUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryHub'
    //     },
    //     {
    //       'name': 'regulatoryProduct',
    //       'group': 'Regulatory',
    //       'label': 'Regulatory Product',
    //       'type': 'RegulatoryProduct',
    //       'icon': null,
    //       'description': 'Regulatory Product',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryProductUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryProduct'
    //     },
    //     {
    //       'name': 'regulatoryReport',
    //       'group': 'Regulatory',
    //       'label': 'Regulatory Report',
    //       'type': 'RegulatoryReport',
    //       'icon': null,
    //       'description': 'Regulatory Report',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryReportUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/regulatoryReport'
    //     },
    //     {
    //       'name': 'rgltChrgtypeProdXref',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Chrgtype Prod Xref',
    //       'type': 'RgltChrgtypeProdXref',
    //       'icon': null,
    //       'description': 'Rglt Chrgtype Prod Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltChrgtypeProdXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltChrgtypeProdXref'
    //     },
    //     {
    //       'name': 'rgltChrgCompTypeXref',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Chrg Comp Type Xref',
    //       'type': 'RgltChrgCompTypeXref',
    //       'icon': null,
    //       'description': 'Rglt Chrg Comp Type Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltChrgCompTypeXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltChrgCompTypeXref'
    //     },
    //     {
    //       'name': 'rgltMktTimezone',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Mkt Timezone',
    //       'type': 'RgltMktTimezone',
    //       'icon': null,
    //       'description': 'Rglt Mkt Timezone',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltMktTimezoneUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltMktTimezone'
    //     },
    //     {
    //       'name': 'rgltPtcptChrgtypeXref',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Ptcpt Chrgtype Xref',
    //       'type': 'RgltPtcptChrgtypeXref',
    //       'icon': null,
    //       'description': 'Rglt Ptcpt Chrgtype Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltPtcptChrgtypeXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltPtcptChrgtypeXref'
    //     },
    //     {
    //       'name': 'rgltPtcptTxPtLoc',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Ptcpt Tx Pt Loc',
    //       'type': 'RgltPtcptTxPtLoc',
    //       'icon': null,
    //       'description': 'Rglt Ptcpt Tx Pt Loc',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltPtcptTxPtLocUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltPtcptTxPtLoc'
    //     },
    //     {
    //       'name': 'rgltStmntFilingXref',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Stmnt Filing Xref',
    //       'type': 'RgltStmntFilingXref',
    //       'icon': null,
    //       'description': 'Rglt Stmnt Filing Xref',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltStmntFilingXrefUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltStmntFilingXref'
    //     },
    //     {
    //       'name': 'rgltTxPtLoc',
    //       'group': 'Regulatory',
    //       'label': 'Rglt Tx Pt Loc',
    //       'type': 'RgltTxPtLoc',
    //       'icon': null,
    //       'description': 'Rglt Tx Pt Loc',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltTxPtLocUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/rgltTxPtLoc'
    //     },
    //     {
    //       'name': 'securityApp',
    //       'group': 'Security',
    //       'label': 'Security App',
    //       'type': 'SecurityApp',
    //       'icon': null,
    //       'description': 'Security App',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityAppUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityApp'
    //     },
    //     {
    //       'name': 'securityAppRole',
    //       'group': 'Security',
    //       'label': 'Security App Role',
    //       'type': 'SecurityAppRole',
    //       'icon': null,
    //       'description': 'Security App Role',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityAppRoleUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityAppRole'
    //     },
    //     {
    //       'name': 'securityAuthCode',
    //       'group': 'Security',
    //       'label': 'Security Auth Code',
    //       'type': 'SecurityAuthCode',
    //       'icon': null,
    //       'description': 'Security Auth Code',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityAuthCodeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityAuthCode'
    //     },
    //     {
    //       'name': 'securityRole',
    //       'group': 'Security',
    //       'label': 'Security Role',
    //       'type': 'SecurityRole',
    //       'icon': null,
    //       'description': 'Security Role',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRoleUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRole'
    //     },
    //     {
    //       'name': 'securityRoleRelation',
    //       'group': 'Security',
    //       'label': 'Security Role Relation',
    //       'type': 'SecurityRoleRelation',
    //       'icon': null,
    //       'description': 'Security Role Relation',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRoleRelationUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRoleRelation'
    //     },
    //     {
    //       'name': 'securityRoleType',
    //       'group': 'Security',
    //       'label': 'Security Role Type',
    //       'type': 'SecurityRoleType',
    //       'icon': null,
    //       'description': 'Security Role Type',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRoleTypeUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityRoleType'
    //     },
    //     {
    //       'name': 'securityToken',
    //       'group': 'Security',
    //       'label': 'Security Token',
    //       'type': 'SecurityToken',
    //       'icon': null,
    //       'description': 'Security Token',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityTokenUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityToken'
    //     },
    //     {
    //       'name': 'securityUser',
    //       'group': 'Security',
    //       'label': 'Security User',
    //       'type': 'SecurityUser',
    //       'icon': null,
    //       'description': 'Security User',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUserUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUser'
    //     },
    //     {
    //       'name': 'securityUserLog',
    //       'group': 'Security',
    //       'label': 'Security User Log',
    //       'type': 'SecurityUserLog',
    //       'icon': null,
    //       'description': 'Security User Log',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUserLogUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUserLog'
    //     },
    //     {
    //       'name': 'securityUserRole',
    //       'group': 'Security',
    //       'label': 'Security User Role',
    //       'type': 'SecurityUserRole',
    //       'icon': null,
    //       'description': 'Security User Role',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUserRoleUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/securityUserRole'
    //     },
    //     {
    //       'name': 'timezone',
    //       'group': 'Unknown',
    //       'label': 'Timezone',
    //       'type': 'Timezone',
    //       'icon': null,
    //       'description': 'Timezone',
    //       'uiEndpoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/timezoneUi',
    //       'serviceEndPoint': 'http://WU2P203390001.CD2.BP.COM:9002/api/timezone'
    //     }
    // ];
}
