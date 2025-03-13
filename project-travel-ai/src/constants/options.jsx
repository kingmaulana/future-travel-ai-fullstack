export const selectTravelesList=[
    {
        id: 1,
        title: 'Just Me',
        people: '1',
        icon: '✈️'
    },
    {
        id: 2,
        title: 'A Couple',
        people: '2',
        icon: '👩‍❤️‍👨'
    },
    {
        id: 3,
        title: 'Family',
        people: '3 to 5 People',
        icon: '👨‍👨‍👧‍👧'
    }
]

export const SelectedBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc:'Stay conscious of costs',
        icon: '💲'
    },
    {
        id: 2,
        title: 'Moderate',
        desc:'Keep cost on average side',
        icon: '💳'
    },
    {
        id: 3,
        title: 'Luxury',
        desc:'Dont worry about cost',
        icon: '💰'
    },
]

export const AI_PROMPT='Generate Travel plan for location: {location}, for {totalDays} days for {traveler} with a {budget} budget, give me a Hotels options list with HotelName, Hotel address, Price, hotelImageUrl,geo coordinates, rating, descriptions and suggest itenerary must be in array [activities with placeName, Place Details, Place Image Url, Geo Coordinates, ticket pricing, rating, timeToTravel in minutes, time (in range hours)] each of the location for {totalDays} days with each day plan with best time to visit in JSON format'