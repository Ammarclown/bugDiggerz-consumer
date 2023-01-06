const axios = require('axios');

const processPendingTicket = async (message) => {
  const q = message.body.tickets.quantity
  const c=message.body.tickets.category
  const m=message.body.matchNumber
  
  console.log(m)
  console.log(c)
  console.log(q)
   await axios.patch(`https://bug-diggerz-shop.vercel.app/api/pending/${m}/${c}/${q}`,{
    
   }).then(function (response) {
    // console.log(response)
     console.log("TICKET PENDING")
   })
   .catch(function (error) {
    console.log("ERROR IN PENDING MESSAGE")
     console.log(error);
     
   });
  
   await axios.post(`https://analytics-microservice-one.vercel.app/api/analytics/add`,{
    matchNumber:message.body.matchNumber,
    tickets:{
      category:c,
      quantity:q,
      price:message.body.tickets.price,
      stat:"pending"
    },
   }).then(function (response) {
    // console.log(response)
     console.log("PENDING ANALYTICS")
   })
   .catch(function (error) {
    console.log("ERROR IN PENDING MESSAGE")
     console.log(error);
     
   });
 // console.log(q)
  //console.log(test)
  return Promise.resolve('[processPendingTicket]')

};

const processCancelledTicket = async (message) => {
  const q = message.body.tickets.quantity
  const c=message.body.tickets.category
  const m=message.body.matchNumber
  axios.patch(`https://bug-diggerz-shop.vercel.app/api/cancel/${m}/${c}/${q}`,{
    
   }).then(function (response) {
    // console.log(response)
     console.log("ADDED DATABASE")
   })
   .catch(function (error) {
    console.log("ERROR IN RESERVATION MESSAGE")
     console.log(error);
   });

   await axios.post(`https://analytics-microservice-one.vercel.app/api/analytics/add`,{
    matchNumber:message.body.matchNumber,
    tickets:{
      category:c,
      quantity:q,
      price:message.body.tickets.price,
      stat:"cancelled"
    },
   }).then(function (response) {
    // console.log(response)
     console.log("CANCELLED ANALYTICS")
   })
   .catch(function (error) {
    console.log("ERROR IN PENDING MESSAGE")
     console.log(error);
     
   });
  
 // console.log(q)
  //console.log(test)
  return Promise.resolve('[processCancelledTicket]')

};

const processReservedTicket = async (message) => {
  const q = message.body.tickets.quantity
  const c=message.body.tickets.category
  const m=message.body.matchNumber
  axios.patch(`https://bug-diggerz-shop.vercel.app/api/reserved/${m}/${c}/${q}`,{
    
   }).then(function (response) {
    // console.log(response)
     console.log("TICKET RESERVED")
   })
   .catch(function (error) {
    console.log("ERROR IN RESERVATION MESSAGE")
     console.log(error);
   });

  await axios.post(`https://analytics-microservice-one.vercel.app/api/analytics/add`,{
    matchNumber:message.body.matchNumber,
    tickets:{
      category:c,
      quantity:q,
      price:message.body.tickets.price,
      stat:"reserved"
    },
   }).then(function (response) {
    // console.log(response)
     console.log("RESERVED ANALYTICS")
   })
   .catch(function (error) {
    console.log("ERROR IN PENDING MESSAGE")
     console.log(error);
     
   });
 // console.log(q)
  //console.log(test)
  return Promise.resolve('[processReservedTicket]')
};

const processMasterlist = async (message) => {
  axios.post(`https://bug-diggerz-shop.vercel.app/api/matches`,{
    "matchNumber": message.body.matchNumber,
    "roundNumber": message.body.roundNumber,
    "dateUtc": message.body.dateUtc,
    "location": message.body.location,
    "availability": {
      "category1": {
        "available":message.body.availability.category1.available,
        "pending": message.body.availability.category1.pending,
        "price": message.body.availability.category1.price
      },
      "category2": {
        "available": message.body.availability.category2.available,
        "pending": message.body.availability.category2.pending,
        "price": message.body.availability.category2.price
      },
      "category3": {
        "available": message.body.availability.category3.available,
        "pending": message.body.availability.category3.pending,
        "price": message.body.availability.category3.price
      }            
    },
    "homeTeam": message.body.homeTeam,
    "awayTeam": message.body.awayTeam,
    "group": message.body.group

  })
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
  processMasterlist
};
