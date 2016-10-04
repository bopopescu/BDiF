cd /root
./spark/bin/spark-shell --driver-memory 14G

// Can access shell using sys:
import sys.process._
"ls -al" !

val sqlContext = new org.apache.spark.sql.SQLContext(sc)

// for implicitly conversion of an RDD to a DataFrame:
import sqlContext.implicits._


val tweets = sqlContext.read.json("tweets/*.json")
