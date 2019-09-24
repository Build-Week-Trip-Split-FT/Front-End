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

export const mockTrips = {
  id: 0,
  username: "testuser",
  photo: "",
  trips: [
    {
      id:0,
      destination: "Bahamas",
      date: new Date("08/27/2018"),
      active: false,
      num_people: 5,
    },
    {
      id:0,
      destination: "New York",
      date: new Date("09/23/2019"),
      active: true,
      num_people: 4,
    },
    {
      id:0,
      destination: "New York",
      date: new Date("09/23/2019"),
      active: true,
      num_people: 4,
    },
  ]
};