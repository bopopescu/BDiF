import os
import sys
from pyspark import SparkConf, SparkContext
from pyspark.sql import SQLContext
APP_NAME = "My Spark Application"
def str_date(x):
  month={"Jan":"01","Feb":"02","Mar":"03"}
  x1=x.split(" ")
  y=x1[5]
  m=month[x1[1]]
  d=x1[2]
  return "-".join([y,m,d])
def mapp(x):
  return str_date(x.created_at)+"\t"+x.text.lower()
if __name__=="__main__":
  conf = SparkConf().setAppName(APP_NAME)
  conf = conf.setMaster("local[*]")
  sc = SparkContext(conf=conf)
  sqlContext = SQLContext(sc)
  df = sqlContext.read.json("tweets/cleaned_2013_01_0.json")
  fr = df.filter(df["lang"].like('%en%'))
  fr=fr.select(["created_at","text"])
  rdd=fr.rdd
  rdd1=rdd.map(mapp)
  rdd1.saveAsTextFile("tweets3")
  #df1=sc.parallelize(fr.collect()).saveAsTextFile("tweets/2013.txt")
  #df1.write.save("tweets2/2013.txt",format="text")
  #print df1
