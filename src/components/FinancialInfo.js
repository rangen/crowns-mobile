import React from 'react'
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useStore } from '../store';

const FinancialInfo = () => {
    const store = useStore();
    const pol = store.selectedPolitician;
    
    const fmtCash = val => {
        let formatted = (+val).toFixed(2)
        return '$' + formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const fmtDate = val => {
        return new Date(val).toLocaleDateString();
    }

    return (
        <div style={{marginBottom: 60}}>
            <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {'Campaign Finances for 2019-20 Cycle'}
            </TableCell>
            <TableCell align="right">
              {`(last report ${fmtDate(pol.coverage_end_date)})`}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{fontStyle: 'italic'}}>
              {'Total Raised from Individuals'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.total_individual_contributions)}
            </TableCell>
          </TableRow>
          {!!pol.contrib_from_other_comms && 
          <TableRow>
            <TableCell style={{fontStyle: 'italic'}}>
              {'Candidate Raised from other Campaigns'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.contrib_from_other_comms)}
            </TableCell>
          </TableRow>}
          {!!pol.contrib_from_party_comms && 
          <TableRow>
            <TableCell style={{fontStyle: 'italic'}}>
              {'Candidate Raised from Party'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.contrib_from_party_comms)}
            </TableCell>
          </TableRow>}
          {!!pol.loans_from_candidate && 
          <TableRow>
            <TableCell style={{fontStyle: 'italic'}}>
              {'Candidate Loaned to Own Campaign'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.loans_from_candidate)}
            </TableCell>
          </TableRow>}
          {!!pol.contributions_from_candidate && 
          <TableRow>
            <TableCell style={{fontStyle: 'italic'}}>
              {'Candidate Donated to Own Campaign'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.contributions_from_candidate)}
            </TableCell>
          </TableRow>}
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>
              {'Total Funds Raised'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.total_receipts)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>
              {'Total Funds Spent'}
            </TableCell>
            <TableCell align="right" style={{color: 'red'}}>
              {fmtCash(pol.total_disbursements)}
            </TableCell>
          </TableRow>
          {(!!pol.individual_refunds || !!pol.comm_refunds) && 
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>
                {'Refunded'}
              </TableCell>
              <TableCell />
            </TableRow>}
            {!!pol.individual_refunds &&
            <TableRow>
              <TableCell style={{fontStyle: 'italic'}}>
                {'Refunded to Individuals'}
              </TableCell>
              <TableCell align="right">
                {fmtCash(pol.individual_refunds)}
              </TableCell>
            </TableRow>}
            {!!pol.comm_refunds &&
              <TableRow>
                <TableCell style={{fontStyle: 'italic'}}>
                {'Refunded to Other Campaigns'}
                </TableCell>
              <TableCell align="right">
                {fmtCash(pol.comm_refunds)}
              </TableCell>
            </TableRow>}
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>
              {'Summary'}
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              {'Cash on Hand Beginning Cycle'}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.cash_on_hand_start)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {`Cash on Hand Last Reported (${fmtDate(pol.coverage_end_date)})`}
            </TableCell>
            <TableCell align="right">
              {fmtCash(pol.cash_on_hand_end)}
            </TableCell>
          </TableRow>
          {!!pol.debts &&
            <TableRow>
              <TableCell>
                {'Outstanding Debt for Campaign'}
              </TableCell>
              <TableCell align="right" style={{color: 'red'}}>
                {fmtCash(pol.debts)}
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </div>
    )
}

export default FinancialInfo;
