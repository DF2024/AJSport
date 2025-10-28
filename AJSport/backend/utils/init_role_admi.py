from backend.database.db import engine
from backend.models.models_users import User
from backend.models.models_role import Role
from backend.auth.auth import hash_password
from sqlmodel import Session, select
from datetime import date


def init_roles_and_admin():
    with Session(engine) as session:
        # Crear roles si no existen
        admin_role = session.exec(select(Role).where(Role.name_role == "admin")).first()
        client_role = session.exec(select(Role).where(Role.name_role == "client")).first()

        if not admin_role:
            admin_role = Role(name_role="admin")
            session.add(admin_role)
        if not client_role:
            client_role = Role(name_role="cliente")
            session.add(client_role)
        session.commit()

        # Crear usuario administrador si no existe
        admin_user = session.exec(select(User).where(User.email_user == "admin@example.com")).first()
        if not admin_user:
            admin_user = User(
                name_user="Administrador",
                lastname_user="Principal",
                email_user="admin@correo.com",
                hash_password=hash_password("admin123"),
                ci_user="00000000",
                number_user="00000000",
                born_date=date(1990, 1, 1),  # ✅ fecha como objeto date
                role_id=admin_role.id_role,
            )
            session.add(admin_user)
            session.commit()
            print("✅ Usuario administrador creado correctamente.")
        else:
            print("ℹ️ El usuario administrador ya existe.")


if __name__ == "__main__":
    init_roles_and_admin()
