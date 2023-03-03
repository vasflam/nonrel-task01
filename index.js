import { MongoClient } from 'mongodb';


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const RESPONSE_TIME_HOUR = 'within an hour';
const RESPONSE_TIME_DAY = 'within a day';
const RESPONSE_TIME_HOURS = 'within a few hours';

/**
 * Filter
 */
const query1 = async (airbnb, city, persons, amenities, responseTime, rating) => {
  const query = {
    city,
    accommodates: persons,
  };
  const output = [];

  if (Array.isArray(amenities) && amenities.length > 0) {
    query['amenities'] = { $all: amenities };
    output.push(`with amenities: ${amenities.join(', ')}`);
  }

  if (responseTime) {
    query['host_response_time'] = responseTime;
    output.push(`with response time '${responseTime}'`);
  }

  if (rating) {
    rating = parseInt(rating);
    query['review_scores_value'] = { $gte: rating };
    output.push(`and with rating >= ${rating}`);
  }

  const rows =  await airbnb.find(query).toArray();
  console.log(`Found ${rows.length} result(s) for ${persons} person(s) in ${city} ${output.join('; ')}`);

  return rows;
};

async function main() {
  await client.connect();
  const db = client.db('airbnb');
  const airbnb = db.collection('airbnb');
  await query1(airbnb, 'Amsterdam', 3, ['Wireless Internet', 'Kitchen']);
  await query1(airbnb, 'Amsterdam', 3, ['Wireless Internet', 'Kitchen', 'TV'], RESPONSE_TIME_HOUR);
  await query1(airbnb, 'Amsterdam', 3, null, null, 9);
}

main().then(() => {
  client.close();
}).catch(console.dir);

