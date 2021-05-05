import React from 'react';
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { config } from "../../../../firebaseConfig";

import firebase from "firebase/app";

const s = (a: any) => JSON.stringify(a, null, 2);

export default function TableWrapper() {
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
            <div>
            <FirebaseDatabaseNode
              path="apteki/"
            //   limitToFirst={this.state.limit}
              // orderByKey
               orderByKey
            >
              {({value}) =>
              {
                  if (value === null || typeof value === "undefined") return null;
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
                      ).filter(x=>x.data.Customer.Name.includes('PASZ'));
                  return (
                    <pre>{s(valuesWithKeys)}</pre>
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
