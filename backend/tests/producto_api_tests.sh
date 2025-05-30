#!/bin/bash

# Variables
API_URL="https://pizza-grados.onrender.com"
TOKEN="TU_TOKEN_DE_AUTENTICACION" # Reemplaza con un token válido

# 1. Prueba de registro de producto con Cloudinary public_id
echo "Probando registro de producto..."
curl -X POST "$API_URL/registro_producto_admin" \
-H "Authorization: $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "titulo": "Producto Test Cloudinary",
  "categoria": "Categoria Test",
  "subcategoria": "Subcategoria Test",
  "extracto": "Extracto de prueba",
  "estado": true,
  "str_variedad": "Variedad Test",
  "descuento": false,
  "portada": "cloudinary_public_id_o_url"
}'

echo -e "\n"

# 2. Prueba de actualización de producto (reemplaza PRODUCTO_ID)
echo "Probando actualización de producto..."
curl -X PUT "$API_URL/actualizar_producto_admin/PRODUCTO_ID" \
-H "Authorization: $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "titulo": "Producto Test Cloudinary Actualizado",
  "categoria": "Categoria Test",
  "subcategoria": "Subcategoria Test",
  "extracto": "Extracto actualizado",
  "estado": true,
  "str_variedad": "Variedad Test",
  "descuento": true,
  "portada": "nuevo_cloudinary_public_id_o_url"
}'

echo -e "\n"

# 3. Prueba de subida de imagen a galería
echo "Probando subida de imagen a galería..."
curl -X POST "$API_URL/subir_imagen_producto_admin" \
-H "Authorization: $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "producto": "PRODUCTO_ID",
  "imagen": "cloudinary_public_id_o_url"
}'

echo -e "\n"

# 4. Prueba de obtención de productos (listar)
echo "Probando listado de productos..."
curl -X GET "$API_URL/listar_productos_admin" \
-H "Authorization: $TOKEN"

echo -e "\n"

# Nota: Reemplaza PRODUCTO_ID y TOKEN con valores reales antes de ejecutar este script.
