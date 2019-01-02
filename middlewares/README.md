## API middlewares

Περιέχει μια λίστα απο χρήσιμες συναρτήσεις που χρησιμοποιήσαμε σαν middlewares
κατα την ανάπτυξη του API. 

**Περιεχόμενα**

**apiMiddlewares.apiBadFormatRequest** = ελέγχει αν το format είναι json. Αν είναι 
η αν δεν ορίζεται, δεν υπάρχει πρόβλημα. Αν έχει οποιαδήποτε άλλη τιμή, πετάει
400 - Bad Request.

**apiMiddlewares.checkRequestForProduct** = ελέγχει αν το request περιέχιε τα υποχρε-
ωτικά πεδία της βάσης. Αν οποιοδήποτε είναι null, επιστρεφει 400 -Bad Request.
Μας χρησιμεύει στο full update (verb **PUT**) και στο create (verb **POST**). 
Στη συνέχεια δημιουργεί για ευκολία ένα object με τις παραμέτρους, και το κολλάει
στο request.parameters.x.
