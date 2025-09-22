#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>

std::string remove(const std::string& input, const std::string& charsToRemove) {
    std::string result = input;
    result.erase(
        std::remove_if(result.begin(), result.end(),
                       [&](char c) {
                           return charsToRemove.find(c) != std::string::npos;
                       }),
        result.end());
    return result;
}

std::string upper(const std::string& input) {
    std::string result = input;
    std::transform(result.begin(), result.end(), result.begin(),
                   [](unsigned char c){ return std::toupper(c); });
    return result;
}


int main() {
    // 3141592653589793238462643383279
    // CGG GGC CTT TCA ATG GAT GTC ATG CTC TAA GTT CTT (cachesleuth)
    // 6.626
    // bit.ly/3KhZsVX
    // Zoey와 섹스하고 싶어

    // # PI

    std::string pi = "3141592653589793238462643383279";
    std::string USER_INPUT_PI;

    std::cout << "Enter PI:" << std::endl;
    std::getline(std::cin >> std::ws, USER_INPUT_PI);

    if (USER_INPUT_PI == pi) {
        std::cout << "NEXT" << std::endl;
    }
    else if (USER_INPUT_PI != pi) {
        std::cout << "INCORRECT" << std::endl;
    }

    // # Deoxyribonucleic Acid

    std::string DNA = "CGG GGC CTT TCA ATG GAT GTC ATG CTC TAA GTT CTT";
    std::string USER_INPUT_DNA;

    std::cout << "Enter DNA:" << std::endl;
    std::getline(std::cin >> std::ws, USER_INPUT_DNA);

    if (remove(upper(USER_INPUT_DNA)," ") == remove(upper(DNA)," ")) {
        std::cout << "NEXT" << std::endl;
    }
    else if (remove(upper(USER_INPUT_DNA)," ") != remove(upper(DNA)," ")) {
        std::cout << "INCORRECT" << std::endl;
    }

    // # Planck's Constant

    std::string PlancksConstant = "6.626";
    std::string USER_INPUT_PC;

    std::cout << "Enter Planck's Constant:" << std::endl;
    std::getline(std::cin >> std::ws, USER_INPUT_PC);

    if (USER_INPUT_PC == PlancksConstant) {
        std::cout << "NEXT" << std::endl;
    }
    else if (USER_INPUT_PC != PlancksConstant) {
        std::cout << "INCORRECT" << std::endl;
    }

    // # Link

    std::string Link = "bit.ly/3KhZsVX";
    std::string USER_INPUT_LINK;

    std::cout << "Enter Link:" << std::endl;
    std::getline(std::cin >> std::ws, USER_INPUT_LINK);

    if (USER_INPUT_LINK == Link) {
        std::cout << "NEXT" << std::endl;
    }
    else if (USER_INPUT_LINK != Link) {
        std::cout << "INCORRECT" << std::endl;
    }

    // # Korean

    std::string Korean = "Zoey와 섹스하고 싶어";
    std::string USER_INPUT_KOREAN;

    std::cout << "Enter Link:" << std::endl;
    std::getline(std::cin >> std::ws, USER_INPUT_KOREAN);

    if (USER_INPUT_KOREAN == Korean) {
        std::cout << "NEXT" << std::endl;
    }
    else if (USER_INPUT_KOREAN != Korean) {
        std::cout << "INCORRECT" << std::endl;
    }

    return 0;
}