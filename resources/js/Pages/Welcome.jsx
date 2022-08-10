import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Pulsera de Seguridad" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-450 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-xl text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-xl text-gray-700 underline">
                                Inicio de Sesion
                            </Link>

                            <Link href={route('register')} className="ml-4 text-xl text-gray-700 underline">
                                Registro
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-900 text-5xl font-bold">
                                        Pulsera de Seguridad 
                                    </div>
                                </div>

                    <div className="mt-8 bg-white dark:bg-blue-400 overflow-hidden shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6">
                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-black text-lg">
                                        Alerte a sus familiares que se encuentra en una situación de riesgo.
                                        Envie su ubicación en tiempo real de forma rapida y discreta.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-black text-lg">
                                        La pulsera de seguridad le permitira al usuario darle aviso a sus familiares o contactos de confianza que se encuentra en una situación de peligro con un mensaje a través de telegram y SMS.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-black text-lg">
                                        Registre de manera facil y rapida los contactos que seran alertados cuando active la pulsera
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l">
                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-black text-lg">
                                        Registre de manera facil y rapida los contactos que seran alertados cuando active la pulsera
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
