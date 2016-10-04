import os, sys
from pyspark import SparkConf, SparkContext
from pyspark.sql import SQLContext
import json
APP_NAME = "My Spark Application"


if __name__=="__main__":
	conf = SparkConf().setAppName(APP_NAME)
	conf = conf.setMaster("local[*]")
	sc = SparkContext(conf=conf)
	sqlContext = SQLContext(sc)
	df = sqlContext.read.json("tweets/*.tar.gz")
	en_content = df.filter(df["lang"].like('%en%'))
	twdf=en_content.select(["created_at","text"])
	with open('step2.json', 'w') as ofile:
		json.dump(d, twdf)