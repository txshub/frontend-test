export default () => ([
  {
    field: 'value',
    type: 'number',
    displayText: 'Value',
    selector: entry => entry.value
  },
  {
    field: 'referrer',
    type: 'multi',
    displayText: 'Referrer',
    selector: entry => entry.referrer.id,
    items: JSON.parse(window.sessionStorage.getItem('referrers'))
      .map(referrer => ({ text: referrer.givenName, value: referrer.id }))
  },
  {
    field: 'applicationStatus',
    type: 'multi',
    displayText: 'Application Status',
    selector: entry => entry.applicationStatus,
    items: JSON.parse(window.sessionStorage.getItem('appStatuses'))
      .map(status => ({ text: status, value: status }))
  },
  {
    field: 'mortgageRenewalDate',
    type: 'date',
    displayText: 'Mortgage Renewal Date',
    selector: entry => entry.mortgageRenewalDate
  },
  {
    field: 'clientCreatedDate',
    type: 'date',
    displayText: 'Client Created Date',
    selector: entry => entry.clientCreatedDate
  },
  {
    field: 'firstPaymentDate',
    type: 'date',
    displayText: 'First Payment Date',
    selector: entry => entry.firstPaymentDate
  }
])
