#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <random>
using namespace std;

struct row {
	string symbol, time;
	double price, volume;
};



const int N = 20;
const string symbols[N] = { "A","QQQ","H","BABA","M","AAPL","BRK.A","C","GOOG","HOG","HPQ","INTC","KO","LUV","MMM","MSFT","T","TGT","TXN","WMT" };

// days of each month in 2015, in total 365 days
const int days[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

// d: normal random variable generator
std::random_device rd;
std::mt19937 gen(rd());
std::normal_distribution<> d(0, 1);

// convert num to a two digit string; num(0-99)
inline string get_string(int num) {
	return num >= 10 ? std::to_string(num) : '0' + std::to_string(num);
}

row get_one_row() {
	string symbol = symbols[rand() % N];

	// a randome day in 2015, a random time between 10am and 4pm;
	int year = 2015, month, day, hour, minute, second;
	int cnt = rand() % 365;
	int cum_sum = 0;
	for (month = 1; month <= 12; month++) {
		cum_sum += days[month - 1];
		if (cum_sum >= cnt) {
			day = cnt - (cum_sum - days[month - 1]);
			break;
		}
	}
	cnt = rand() % (3600 * 6);
	hour = cnt / 3600 + 10;
	cnt %= 3600;
	minute = cnt / 60;
	second = cnt % 60;
	// format: 2015.08.05T11:45:34
	string time = std::to_string(year)+ '.' + get_string(month) + '.' + get_string(day) + 'T'
		+ get_string(hour) + ':' + get_string(minute) + ':' + get_string(second) + ".000";
	// price follows chi-square distribution; E(price) = 200
	double r1 = d(gen), r2 = d(gen);
	double price = 100 * (r1*r1 + r2*r2);

	// volume follows chi-square distribution; E(volume) = 20
	r1 = d(gen), r2 = d(gen);
	double volume = 10 * (r1*r1 + r2*r2);
	return row{ symbol, time, price, volume };
}

int main(int argc, char *argv[]) {
	// cnt: number of rows to generate
	int cnt;
	if (argc>1) cnt = std::stoi(argv[1]);
	else cnt = 100000;
	ofstream os("data.csv");
	os << "SYMBOL,TIME,PRICE,VOLUME\n";
	for (int i = 0; i<cnt; i++) {
		row r = get_one_row();
		os << r.symbol << ',' << r.time << ',' << r.price << ',' << r.volume << endl;
	}
	return 0;
}


