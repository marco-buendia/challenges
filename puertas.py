def changeDoor(arrDoors, cont):
    for i in range(1,len(arrDoors)+1):
        if i%cont==0:
            if arrDoors[i-1] == 0:
                arrDoors[i-1] += 1
            else:
                arrDoors[i-1] -= 1

def resFinales(numDoors):

    arr = []
    for i in range(0, numDoors):
        arr.append(0)

    for i in range(1, len(arr)+1):
        changeDoor(arr,i)

    sumDoors = 0
    arrOpenDoors = []
    
    cont = 1
    for i in arr:
        if i==1:
            arrOpenDoors.append(cont)
        sumDoors+=i
        cont+=1
    
    return sumDoors, arrOpenDoors

flag = False

while flag == False:

    x = input("¿Cuantas puertas van a existir?\n")
    try:
        x = int(x)
        flag = True
    except:
        print("Favor de ingresar un numero entero")

results = resFinales(x)

print(str(results[0]) + " puertas quedaron abiertas")
print("Las puertas abiertas fueron " + str(results[1]))