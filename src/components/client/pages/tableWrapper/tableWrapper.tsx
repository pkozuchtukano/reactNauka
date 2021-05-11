import React from 'react';
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { config } from "../../../../firebaseConfig";

import firebase from "firebase/app";
import { formatAppDate, formatAppDateTime } from '../../../../util/formats';

const s = (a: any) => JSON.stringify(a).replaceAll('"','');

const daysCountLastBackupToAttention = 2;
const monthsCountLastUpdateAppToAttention = 3;
const monthsCountLastUpdateBlozToAttention = 1;
const daysCountLastRaportToAttention = 2;

function lessThenMonths(date: Date, monthsCount: number){
    let months;
    let now = new Date();

    months = (now.getFullYear() - date.getFullYear()) * 12;
    months -= date.getMonth();
    months += now.getMonth();

    let result = months <= 0 ? 0 : months
    return result > monthsCount;
}

function lessThenDays(date:Date, numberOfDays)
{
    let now = Date.now();
    let diff =  Math.floor(( now - date.getTime() ) / 86400000);
    return diff > numberOfDays;
}

function compareTownStreet( a, b ) {
  if ( a.data.Customer.Town + a.data.Customer.Street < b.data.Customer.Town + b.data.Customer.Street ){
    return -1;
  }
  if ( a.data.Customer.Town + a.data.Customer.Street > b.data.Customer.Town + a.data.Customer.Street ){
    return 1;
  }
  return 0;
}

[].sort( compareTownStreet );

export default function TableWrapper() {
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
            <div>
            <FirebaseDatabaseNode
              path="apteki/"
             orderByChild="Customer/Town/"
            >
              {({value}) =>
              {
                if (value === null || typeof value === "undefined") return null;
                //const sortedVal = value.sort(compareTownStreet);

                const keys = Object.keys(value);
                const values = Object.values(value);
                const valuesWithKeys:any = values.map(
                  (value, i) =>
                  {
                    const data:any = values[i] ;
                    return {
                      data,
                      id: keys[i]
                    }
                  }
                  )
                  // .filter(x=>x.data.CurrentRaport.BlozInfo.LastBlozUpdateDate
                  //   //.includes('PASZ')
                  //   );
                  console.log("🚀 ~ file: tableWrapper.tsx ~ line 25 ~ TableWrapper ~ value", valuesWithKeys.sort(compareTownStreet))

                  return (
                    <div>
                      <table className="table-stripped">
                        <thead>
                        <tr><th>Lp</th><th>Nazwa</th><th>Program</th><th>Bloz</th><th>Backup</th><th>Raport</th></tr>
                        </thead>
                        <tbody>
                      {
                        valuesWithKeys.map((x,i)=>(
                          <tr key={keys[i]}>
                            <td>{i+1}</td>
                            <td>
                              <div>{s( x.data.Customer.Name)}</div>
                              <div><b>{s( x.data.Customer.Town)}</b> {s( x.data.Customer.Street)}</div>
                              <div>tel: <a href={"tel:" + s( x.data.Customer.Phone)}>{s( x.data.Customer.Phone)}</a> , <a href={"mailto:" + x.data.Customer.Email} target="_blank" rel="noreferrer" >{s(x.data.Customer.Email)}</a></div>
                            </td>
                            <td className={lessThenMonths(new Date( Date.parse( x.data.CurrentRaport.KSAOWInfo.UpdateDate)),monthsCountLastUpdateAppToAttention) ? "attention" : ""}>
                              <div> {s( x.data.CurrentRaport.KSAOWInfo.Version)}</div>
                              <div className="no-br">{formatAppDate( x.data.CurrentRaport.KSAOWInfo.UpdateDate)}</div>
                            </td>
                            <td>
                              <div className={"no-br " + (lessThenMonths(new Date( Date.parse( x.data.CurrentRaport.BlozInfo.LastBlozUpdateDate)),monthsCountLastUpdateBlozToAttention) ? "attention" : "")}>{formatAppDate( x.data.CurrentRaport.BlozInfo.LastBlozUpdateDate)}</div>
                              {
                                x.data.CurrentRaport.BlozInfo.IsBufferingBloz ? (
                                                                      <>
                                      <div><p className="center attention">BUFOR</p></div>
                                      <div className="no-br">{formatAppDate( x.data.CurrentRaport.BlozInfo.BufferedBlozDate)}</div>
                                    </>
                                  ) : ( <p className="center">-</p> )
                              }
                            </td>
                            <td className={lessThenDays(new Date( Date.parse(x.data.CurrentRaport.LastBackupInfo.BackupDate)),daysCountLastBackupToAttention) ? "attention" : ""}>
                              <div className="no-br">{formatAppDate( x.data.CurrentRaport.LastBackupInfo.BackupDate)}</div>
                              <div>Stan. {x.data.CurrentRaport.LastBackupInfo.Stand}</div>
                            </td>
                            <td className={lessThenDays(new Date( Date.parse( x.data.LastRaportDate)),daysCountLastRaportToAttention) ? "attention" : ""}>
                              <div className="no-br">{formatAppDateTime( x.data.LastRaportDate)}</div>
                            </td>
                          </tr>
                        ))
                      }
                      </tbody>
                      </table>
                    </div>
                  )

                }

              }

            </FirebaseDatabaseNode>
          </div>
        </FirebaseDatabaseProvider>
    )
};


                // return (
                //   <React.Fragment>
                //     <pre>Path {d.path}</pre>
                //     <pre style={{ height: 300, overflow: "auto" }}>
                //       Value {s(d.value)}
                //     </pre>
                //     <button
                //       onClick={() => {
                //         //this.setState(state => ({ limit: state.limit + 2 }));
                //       }}
                //     >
                //       Load more
                //     </button>
                //   </React.Fragment>
                // );
              // }}
