#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

int main() {
	ifstream is("binaryfile", ios::binary);
	// copies all data into buffer
	std::vector<char> buffer((
		std::istreambuf_iterator<char>(is)),
		(std::istreambuf_iterator<char>()));

	return 0;
}