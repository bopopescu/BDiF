# BDiF_assignment_C
by:Chao Zhu
####Here are some of my thoughts on assignmnet_C:
###(1)
I use pysaprk to load the data into Spark and then transform them from the .json format to .txt format.
My main step is like this :
1# filter those who speak english. The reason I did this step is after I explored the data, I found other language users may have some very strange characters which we can't analysis
2# drop out all the other information except date and context of this tweet. The reason is that the initial data is very large wich we can't process it very quickly. Given our limited time, I think drop all the redundant information is good for us.
3# The remaining two attributes,date and context. I made up a dictionary for those stocks I want to analysis and if the split the context by space. If the context contains the key words we want then I will keep them,otherwise I will delete them.
4# i save the rdd to a txt file and start my next step.The reason for making this choice is simply that text files are easier to work with. 
The Reason I use pyspark is Python scripts contain multiple functions, whose purpose includes counting the instances of company names from the Dow Jones Index and computing the ratio of good-sentiment words and bad-sentiment words. 
###(2)
the second step downloading the stock return data.
I used Yahoo API to download the stock daily close data. And calculate the daily return by using today's close price devided by last day's close price and minus 1. I save it as a text file and also upload it to Hadoop HDFS.
###(3)
I join the information from these two text files by the date and make our data set look like:
              |  date  | stockid | daily return | context 1| conetxt 2|...  | context X|
             
And save my datasets to be a text file. After that I will do the next step which is good_bad analysis.
###(4)
In the good_bad analysis,I search the context in the last step and use the dictioanry named LoughranMcDonald_MasterDictionary which contains some good and bad key words. I use context search the number of good or bad words and use (good-bad)/number of contexts(good_bad ratio).Paying attention to the negation words, I specifically check if there are negation words such as “not,” “never,” and “rarely,” and count these as the opposite. Next, I define a variable call good/bad ratio as an indicator for whether the stock prices will move up or down.
###(5)
After I sort out these details, the core step of predicting stock price movements is constructing a regression relationship between the good/bad ratio and the stock returns. The simple regression function will serve as my model for predicting stock prices in the future.So in the end I drop the datetime and again use a regression fucntion to train the dataset and get the return. 

