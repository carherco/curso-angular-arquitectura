# Deployment

Para realizar el deployment de una aplicación Angular, nos servimos del comando *ng build*.

## Crear un build 

Para crear un *build*. Basta con ejecutar el comando *ng build*.

> ng build

Por defecto, nos creará un directorio *dist* en el que colocará el resultado de la compilación. 

Sin embargo el build generado de esta forma no es el más optimo para producción. El comando *ng build* tiene muchos modificadores y opciones. 

## Crear un build en un entorno específico

Podemos crear builds del entorno de desarrollo o del entorno de producción:

```
# Estas son equivalentes
ng build --configuration=production
ng build --c=production
ng build --prod

# y estas también
ng build
```

Podemos crear otros entornos siguiendo estos 2 pasos:

1) Crear un fichero: src/environments/environment.test.ts

2) Añadir una entrada nueva en la sección **configurations** del fichero angular.json

```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "extractCss": true,
    "namedChunks": false,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  },
  "test": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.test.ts"
      }
    ]
  }
}
```

Este cambio afecta únicamente al comando *ng build*. Si queremos tener el entorno también en *ng serve*, tenemos que modificar la sección **serve**.

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "ng-configuration:build"
  },
  "configurations": {
    "production": {
      "browserTarget": "ng-configuration:build:production"
    },
    "test": {
      "browserTarget": "ng-configuration:build:test"
    }
  }
},
```


Y ya podemos usar el nuevo entorno con nuestros comandos *ng build* y *ng serve*.

## Modificar la etiqueta base

```
# Establece el href de la etiqueta base a /myUrl/ en el index.html
ng build --base-href /myUrl/
ng build --bh /myUrl/
```

## Comparación entre --dev y --prod

Los modificadores --dev y --prod establecen valores por defecto de otros modificadores:

![Comparación](img/comparacion_dev_prod.png "Comparación")

Además, --prod ejecuta UglifyJS en el código.

## --build-optimizer y --vendor-chunk

Cuando se usa Build Optimizer, vendor chunk se deshabilita por defecto. Se puede habilitar con --vendor-chunk=true.

El tamaño total de los bundles es menor si no se separan en fichero distintos la app de los vendor ya que permite a Uglify identificar y eliminar bastante más cantidad de código no utilizado.

## Recursos en CSSs

Los recursos incluidos en CSS (imágenes y fonts) se copiar automáticamente como parte del build. 

Se pueden ver estos recursos en la raíz del directorio *dist/*

## Soporte de ES2005

Para realizar un build en ES2015, hay que editar el fichero  ./tsconfig.json para usar "target": "es2015" (en vez de es5).


En este enlace podemos ver todas las opciones de ng build:

https://github.com/angular/angular-cli/wiki/build

En este otro enlace dan consejos para configurar el servidor web, analizar el rendimiento de la aplicación...

https://angular.io/guide/deployment


[Índice](index.md)
