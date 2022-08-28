const { MongoClient, ObjectId } = require('mongodb')

const url = "mongodb://127.0.0.1:27017"
const dbName = 'testdb'
const client = new MongoClient(url)

client.connect((error, client) => {
    if (error) {
        return console.log('connection failed!')
    }
    // select database
    const db = client.db(dbName)

    // insert one data to collection students
  //   db.collection('students').insertOne(
  //   {
  //     name: 'Dwi Cahyo',
  //     email: "dwi@gmail.com"
  //   },
  //   (error, result) => {
  //       if (error) {
  //           return console.log('insert data failed!')
  //       }
  //       console.log(result)
  //   }
  // )

  // insert many data
  // db.collection('students').insertMany(
  //   [
  //     {
  //       name: 'Kukuh',
  //       email: 'kukug@gmail.com'
  //     },
  //     {
  //       name: 'sikucinri',
  //       email: 'sithung@gmail.com'
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('success add many data!')
  //     }
  //     console.log(result)
  //   }
  // )

    // show all data from collection / field
    // db
    // .collection('students')
    // .find({ _id: ObjectId("630b3ec2a3075df038c81637")})
    // .toArray((error, result) => {
    //   console.log(result)
    // })

    // update data by Id
    // const updatePromise = db.collection('students').updateOne(
    //   {
    //     _id: ObjectId('630b3ec2a3075df038c81637')
    //   },
    //   {
    //     $set: {
    //       email: 'sithung@yahoo.com'
    //     }
    //   }
    // )
    // updatePromise
    // .then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

    // update data more than one by criteria

    // db.collection('students').updateMany(
    //   {
    //     name: 'Dwi Cahyo'
    //   },
    //   {
    //     $set: {
    //       name: 'Dwi ajjah'
    //     }
    //   }
    // )

    // delete one data
    db.collection('students').deleteOne(
      {
        _id: ObjectId('630b3ec2a3075df038c81637')
      }
    ).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })

    // delete many data
    db.collection('students').deleteMany(
      {
        name: 'Dwi ajjah'
      }
    ).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
})