# Clonar el repositorio
Ejecute el comando para tener la carpeta del repositorio en su computadora
```
git clone https://github.com/Osvaldo-1/Proyecto-Barber-Shop.git
```
# Ramas
Para agregar nuevas funcionalidades en el código se deben crear ramas que tengan un breve nombre de las nuevas caracteríticas (esto como recomendación). Ya sea que se creé la nueva rama desde GitHub o desde la terminal se propone lo siguiente:
```
git checkout -b <F_nombreRama>
```
Dentro de Visual Studio Code en la terminal asegurarse de estar en la rama indicada de lo contrario se debe seleccioar la rama en la que se va a trabajar
```
git switch <F_nombreRama>
```
## Pull Request
Una vez que los cambios se suban en la correspondiente rama se debe crear un pull request para revisar los conflictos (en caso de existir) y resolverlos para obtener una versión estable, usar los comentarios para comunicarse entre el equipo de desarrollo para discutir los cambios.

# Revisar cambios antes de trabajar
Para evitar conflictos con los miembros del equipo, antes de realizar cualquier modificación ejecute
```
git fetch --all
```
Esto trae todos los cambios que se encuentren en el repositorio, lo que ayuda a evitar conflictos en futuras pull request.

# Dependencias necesarias
Descargas las dependencias después de clonar el repositorio para trabajar de manera adecuada. Ejecutar el comando para instalar las dependencias automaticamente del archivo package.json

```
npm install
```
Esperar a que se terminen de instalar y puede continuar el desarrollo sin ningun incomeniente.
