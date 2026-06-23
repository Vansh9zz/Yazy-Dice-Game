import random

def ScoreCalculation(dies : list):

    d = dies.copy()
    d.sort()
    counts = [0 for i in range(6)]
    availableScores = [0 for i in range(11)]
    dieSum = sum(d)

    # 1s, 2s, 3s, 4s, 5s, 6s, AAA, AAAA, AAABB, ABCDE, AAAAA

    ## 1s through 6s
    for i in range(1,7):
        counts[i-1] = d.count(i)
        availableScores[i-1] = i * counts[i-1]
    
    usableIndex = None

    ## AAA
    for i in range(6):
        if counts[i] >= 3:
            usableIndex = i
            break ## No need to check afterwards - since there can only be one index with more than 3 counts at a time
    
    if usableIndex is not None:
        availableScores[6] = dieSum
    else:
        availableScores[6] = 0
    
    usableIndex = None

    ## AAAA
    for i in range(6):
        if counts[i] >= 4:
            usableIndex = i
            break ## No need to check afterwards - since there can only be one index with more than 3 counts at a time
    
    if usableIndex is not None:
        availableScores[7] = dieSum
    else:
        availableScores[7] = 0
    
    ## AAABB or AABBB (A < B)
    # If we sort counts, and the list is [0,0,0,2,3], then only this is the case
    tempCounts = counts.copy()
    tempCounts.sort()

    if tempCounts == [0,0,0,2,3]:
        availableScores[8] = 25
    else:
        availableScores[8] = 0
    
    ## ABCDE
    if d == [1,2,3,4,5] or d == [2,3,4,5,6]:
        availableScores[9] = 40
    else:
        availableScores[9] = 0
    
    ## AAAAA
    if tempCounts == [0,0,0,0,5]:
        availableScores[10] = 50
    else:
        availableScores[10] = 0

    return availableScores
    



def DiceWork(currTurn:int, pScore, isTaken):
    ## Roll 5 dies
    dies = [0,0,0,0,0]
    isLocked = [0,0,0,0,0]

    turn = 1

    while turn <= 3:

        print(f"PLAYER {currTurn + 1}: Roll {turn}/3 ->")        
        print(f"PLAYER {currTurn + 1}: Dies rolled successfully...")

        (isLocked, dies) = roll(isLocked, dies)

        print(f"PLAYER {currTurn + 1}: Dies Result: ")
        print(dies)

        print(f"\n\nPLAYER {currTurn + 1}: Available Scores -> ")
        availableScores = ScoreCalculation(dies)

        print("\n")

        if not isTaken[currTurn][0]:        
            print(f"1  Ones   : {availableScores[0]}")

        if not isTaken[currTurn][1]:
            print(f"2  Twos   : {availableScores[1]}")
        
        if not isTaken[currTurn][2]:
            print(f"3  Threes : {availableScores[2]}")
        
        if not isTaken[currTurn][3]:
            print(f"4  Fours  : {availableScores[3]}")
        
        if not isTaken[currTurn][4]:
            print(f"5  Fives  : {availableScores[4]}")
        
        if not isTaken[currTurn][5]:
            print(f"6  Sixes  : {availableScores[5]}")
        
        if not isTaken[currTurn][6]:
            print(f"7  AAA    : {availableScores[6]}")
        
        if not isTaken[currTurn][7]:
            print(f"8  AAAA   : {availableScores[7]}")
        
        if not isTaken[currTurn][8]:
            print(f"9  AAABB  : {availableScores[8]}")
        
        if not isTaken[currTurn][9]:
            print(f"10 ABCDE  : {availableScores[9]}")
        
        if not isTaken[currTurn][10]:
            print(f"11 AAAAA  : {availableScores[10]}")

        print(f"PLAYER {currTurn + 1}: What do you want to do: ")
        if turn != 3:
            print(f"If you wish to lock any dice, input 0")
        print(f"Otherwise, enter the number corresponding to your choice")

        choice = int(input(f"PLAYER {currTurn + 1}: Enter your choice here: "))

        ## No need for validation since this will be a design for a webpage with buttons
        if choice == 0:
            if turn != 3:

                lockString = int(input("Which dies do you want to lock? (Enter 0 if none to be locked) - "))

                if lockString =='0':
                    pass
                else:
                    lockString = str(lockString)
                    for i in range(5):
                        if str(i+1) in lockString:
                            isLocked[i] = 1
                        else:
                            isLocked[i] = 0

        if choice != 0:

            pScore[currTurn][choice - 1] = availableScores[choice-1]
            isTaken[currTurn][choice - 1] = 1

            return

        turn += 1
    
    return

def roll(isLocked, dies):
    for i in range(5):
        if not isLocked[i]:
            die = random.randint(1,6)
            dies[i] = die
    
    return (isLocked, dies)


def main():

    n = int(input("No. of Players: "))

    isRunning = True
    currTurn = 0
    scores = [[0 for i in range(11)] for i in range(n)]
    isTaken = [[0 for i in range(11)] for i in range(n)]

    while isRunning:

        print(f"It's Player {currTurn + 1}'s Turn")

        input(f"PLAYER {currTurn + 1}: Press Enter to Continue   ------------------------------------")

        DiceWork(currTurn, scores,isTaken)

        currTurn = (currTurn + 1) % n

if __name__ == "__main__":
    main()



## TASKS:
# 1. Dice Roll
# 2. Dice Locking
# 3. Score Calculating
# 4. Storing Scores, Which stuff is done
# 5. Turn Determination