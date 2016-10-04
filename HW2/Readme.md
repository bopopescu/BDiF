1. data_generator.cpp should be compiled with this command:
	g++ -std=c++11 -o data_generator data_generator.cpp 
	g++ of MinGW and cygwin has some bug and would throw error that cannot find std::stoi and std::to_string.
	Visual studio and g++ under Linux works.
2. run data_generator in this way:
	./data_generator num_of_lines	to generate num_of_lines lines of data. If this number is not specified. Would by default generate 10000 lines of data;
3. In data_generator, time is distributed evenly 10am-4pm during the year 2015. (Have not considered holidays, etc.)
	Both price and volume follow a chi-squared distribution with freedom of two. 

4. script_path in hw2.q need to be set to the path of the execution path;
5. execute hw2.q to get the VWAP file

