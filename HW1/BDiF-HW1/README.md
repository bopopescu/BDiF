# BDiF-HW1
1. when running, linkage of boost lib is required:
libboost_date_time;  Compilation of boost library is needed to generate this library. 
2. The process of my program is quite straightforward. They are well commented. First reading file blocks, then find valid records, and invalid records; Then get vector of returns, then test return's normality test;
3. How to judge if a record is valid or not? 
    In ten entries before this row, if there are at least 3 rows with whom the time difference is more than 2 seconds, then it is invalid. Otherwise it is valid.
4. The NORMAL program is a function inside main.cpp. It accepts a vector of values and judge if they follow normal distributions. 
    This function uses Kolmogorov-Smirnov normality test and alpha is set as 0.5.
5. when outputing the data (in function output_data), we need to synchronize different nodes. To achieve this, I used MPI_Allgather to get the size of the data from each block. Then each node can get the size of all data and store its data in the corresponding part. 


