export const mockData = [
    {
        destination: "Bahamas",
        date: "09/29/19",
        active: true,
        created_by: "Jordan",
        people: [
          {
            first_name: "Jordan",
            last_name: "Doan",
          },
          {
            first_name: "Bill",
            last_name: "Frank"
          }
        ],
        expenses: [
          {
            name:"Dinner",
            amount:50,
            person_name:"Bill",
            debts: [
                {
                    person_name: "Jordan",
                    amount: 25,
                },
                {
                    person_name: "Bill",
                    amount: 0,
                },
            ]
          },
          {
              name:"Amusement park",
              amount:40,
              person_name:"Jordan",
              debts: [
                  {
                      person_name: "Jordan",
                      amount: 0,
                  },
                  {
                      person_name: "Bill",
                      amount:20
                  }
              ]
          }
        ]
    },
    {
        destination: "Bahamas",
        date: "09/29/19",
        active: true,
        created_by: "Jordan",
        people: [
          {
            first_name: "Jordan",
            last_name: "Doan",
          },
          {
            first_name: "Bill",
            last_name: "Frank"
          }
        ],
        expenses: [
          {
            name:"Dinner",
            amount:50,
            person_name:"Bill",
            debts: [
                {
                    person_name: "Jordan",
                    amount: "25",
                },
                {
                    person_name: "Bill",
                    amount:"25",
                },
            ]
          }
        ]
    },
]

