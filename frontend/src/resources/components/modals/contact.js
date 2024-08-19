import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import { useForm } from "react-hook-form";
import { TextInput } from '../styles/contact';
import { useLocation, Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function ContactModal({ open, handleClose }) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
        <DialogContent sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", padding: "0px", backgroundColor: "#E9F0FF", borderRadius: "10px", overflow: "visible", position: "relative"}}>
          <div className='flex justify-end p-3'>
            <Link to={location.state?.from || "/"} className="border-[#A5A6CC] hover:border-[#F4AA5A] border-2 border-solid rounded-full p-3 group" onClick={handleClose}>
              <CloseIcon sx={{ 
                  color: "#A5A6CC", 
                  '.group:hover &': { 
                      color: "#F4AA5A"
                  } 
              }}/>
            </Link>
          </div>
          <div className='flex w-full h-full relative overflow-hidden px-12 pb-12 gap-10 items-center'>
            <Flower className="absolute mix-blend-hard-light opacity-25 left-1/4 -top-1/3 object-cover z-0 -rotate-90"/>
            <div className="flex flex-col flex-1 gap-5">
                <h2 className='text-4xl text-[#1A184C] font-bold'>Any doubts <br/> <span className='font-cormorant text-5xl italic'>Contact us!</span></h2>
                <p className='font-medium text-[#575757] '>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>

                <div className='flex flex-col gap-3'>
                    <PlaceIcon sx={{color: "#6078DF"}} />
                    <p className='text-[#6078DF] text-sm font-bold uppercase'>Location</p>
                    <p>Polo Científico e Tecnológico da Madeira, <br/>
                        Caminho da Penteada, piso -2 <br/>
                        9020-105 <br/>
                        Funchal, Portugal
                    </p>
                </div>

                <div className='flex flex-col gap-3'>
                    <EmailIcon sx={{color: "#6078DF"}} />
                    <p className='text-[#6078DF] text-sm font-bold uppercase'>Email</p>
                    <a href='mailto:support_sleepinsight@gmail.com' target='_blank' rel='noreferrer noopener' className='text-sm font-medium text-[#575757] underline'>support_sleepinsight@gmail.com</a>
                </div>
            </div>
                
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col w-full gap-4 z-[1]">
              <TextInput>
                  <label htmlFor="contact_subject">Subject</label>
                  <input id="contact_subject" type="text" placeholder="Write here" {...register("subject", {required: true})} />
              </TextInput>
              <div className='flex w-full items-center gap-4'>
                <TextInput className='flex-1'>
                    <label htmlFor="contact_name">Name</label>
                    <input id="contact_name"type="text" placeholder="Your Name" {...register("name", {required: true})} />
                </TextInput>
                <TextInput className='flex-1'>
                    <label htmlFor="contact_email">Email</label>
                    <input id="contact_email"type="text" placeholder="Your Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                </TextInput>
              </div>
              <TextInput>
                <label htmlFor="contact_message">Email</label>
                <textarea id="contact_message" placeholder="Write here" {...register("message", {required: true})} rows={5}/>  
              </TextInput>
              

              <input type="submit" className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer" />
            </form>
          </div>
          

        </DialogContent>
    </Dialog>
  );
}

export default ContactModal;
