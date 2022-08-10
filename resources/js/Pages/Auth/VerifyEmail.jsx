import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <Guest>
            <Head title="Verificacion de Correo Electronico" />

            <div className="mb-4 text-sm text-gray-600">
            Gracias por registrarte. Antes de empezar, ¿podría verificar su dirección de correo electrónico haciendo clic en el
                enlace que acabamos de enviarle por correo electrónico? Si no has recibido el correo electrónico, te enviaremos otro con mucho gusto.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button processing={processing}>Reenviar correo de verificación</Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
