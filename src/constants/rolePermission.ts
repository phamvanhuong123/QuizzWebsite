export const roles = {
  ADMIN : 'admin',
  USER : "user"
}

export const permissions= {
    VIEW_ADMIN : 'view_admin',
    VIEW_CLIENT : 'view_client'
}

export const rolePermissions = {
    [roles.ADMIN] : Object.values(permissions),
    [roles.USER] : [permissions.VIEW_CLIENT]
}