"use client"

import { addUserEmailToProduct } from '@/lib/actions'
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import Image from 'next/image'
import { FormEvent, Fragment, useState } from 'react'

interface Props {
    productId: string
}

const Modal = ({ productId }: Props) => {
    let [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await addUserEmailToProduct(productId, email);
        setIsSubmitting(false);
        setEmail('');
        close();
    }


    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }



    return (
        <>
            <button type='button' className='py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold  ' onClick={open} >
                Track
            </button>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-[#f8f0f3]/6 p-6 backdrop-blur-3xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className='flex flex-col'>
                                <div className='flex justify-between'>
                                    <div className='p-3 border border-black-100/2 shadow-2xl rounded-10'>
                                        <Image src="/assets/icons/logo.svg" alt="logo" width={28} height={28} />
                                    </div>
                                    <Image src="/assets/icons/x-close.svg" alt="close" width={24} height={24} className='cursor-pointer' onClick={close} />
                                </div>
                                <h4 className='text-secondary text-lg leading-[24px] font-semibold mt-4'>
                                    Stay updated with product pricing alerts right in your inbox!
                                </h4>
                                <p className='text-sm text-gray-600 mt-2'>
                                    Never miss a bargain with our again timely alerts!
                                </p>
                            </div>
                            <form action="" className='flex flex-col mt-5' onSubmit={handleSubmit}>
                                <label htmlFor="email" className='text-sm font-medium text-gray-700 '>
                                    Email address
                                </label>
                                <div className='px-5 py-3 mt-3 flex items-center gap-2 border border-gray-300 rounded-[27px]'>
                                    <Image src="/assets/icons/mail.svg" alt='mail' width={18} height={18} />
                                    <input required type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your email address' className='flex-1 pl-1 border-none text-gray-500 text-base focus:outline-none border border-gray-300 rounded-[27px] shadow-xs' />
                                </div>
                                <button type='submit' className='px-5 py-3 text-white text-base font-semibold border border-secondary bg-secondary rounded-lg mt-8'>
                                    {isSubmitting ? "Submitting..." : "Track"}
                                </button>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default Modal