# checkMe = range(1, 100)
# primes = []
# for y in checkMe[1:]:
#     x = y
#     dividers = []
#     for x in range(2, x):
#         if (y/x).is_integer():
#             dividers.append(x)
#     if len(dividers) < 1:
#         primes.append(y)
# print("\n"+str(checkMe)+" has "+str(len(primes))+" primes")
# print(primes)


# check_me = range(2, 100)
# primes = []
# for i in check_me:
#     for j in range(2, i):
#         if not i % j:
#             break
#     else:
#         primes.append(i)
# print(f'{check_me} has {len(primes)} primes\n', *primes)


checkMe = range(1, 100)

dividers = []
primes = []

for numbers in range(2, 100):
    prime = True
    for i in range(2, numbers):
        if (numbers % i == 0):
            prime = False
            dividers.append(numbers)
    if prime:
        primes.append(numbers)

print("\n" + str(checkMe) + "has "+str(len(primes))+" primes")
print(primes)
print("\n" + str(checkMe) + "has " + str(len(dividers))+" dividers")
print(dividers)


# primeList = range(2, 100)
# primeNumbers = []

# for numbers in primeList:
#     for list in range(2, numbers):
#         if not numbers % list:
#             break
#         else:
#             primeNumbers.append(numbers)

# print("\n"+str(primeList)+" have "+str(len(primeNumbers))+" primes")
# print(primeNumbers)
