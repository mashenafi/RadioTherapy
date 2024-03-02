import csv

data = []
with open('../../data/dummy_data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    counter = 0
    for row in spamreader:
        if counter > 0:
            data.append(row)
        else:
            print(row)
        counter += 1

print(data)
print(len(data))