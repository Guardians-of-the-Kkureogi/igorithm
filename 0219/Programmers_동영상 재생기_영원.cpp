/*
    쉬울 줄 알았는데 생각보다 애먹었다
    조건대로 구현은 하면되는데
    오프닝을 스킵하는 부분이
    명령어 전후로 다 체크를 해야한다...!
*/

#include <sstream>
#include <string>
#include <vector>

using namespace std;

int timeToSeconds(string &time) {
    int minutes, seconds;
    char delimiter;
    stringstream ss(time);

    ss >> minutes >> delimiter >> seconds;
    return minutes * 60 + seconds;
}

string secondsToString(int totalSeconds) {
    int minutes = totalSeconds / 60;
    int seconds = totalSeconds % 60;

    string min = "";
    string sec = ":";

    if (minutes < 10) {
        min = "0" + to_string(minutes);
    } else {
        min = to_string(minutes);
    }

    if (seconds < 10) {
        sec += "0" + to_string(seconds);
    } else {
        sec += to_string(seconds);
    }

    return min + sec;
}

void checkOpening(int &currentTime, string &op_start, string &op_end) {
    int opStart = timeToSeconds(op_start);
    int opEnd = timeToSeconds(op_end);
    if (opStart <= currentTime && currentTime <= opEnd) {
        currentTime = opEnd;
    }
}

string solution(string video_len, string pos, string op_start, string op_end,
                vector<string> commands) {
    int time = timeToSeconds(pos);
    for (int i = 0; i < commands.size(); i++) {
        string currentCommand = commands[i];
        checkOpening(time, op_start, op_end);
        if (currentCommand == "prev") {
            time -= 10;
            if (time < 10)
                time = 0;
        } else if (currentCommand == "next") {
            time += 10;
            int lastTime = timeToSeconds(video_len);
            if (lastTime - time < 10) {
                time = lastTime;
            }
        }
        checkOpening(time, op_start, op_end);
    }
    return secondsToString(time);
}