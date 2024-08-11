import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';

function ContactModal({ open, handleClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
      <DialogContent sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", padding: "50px", alignItems: "center", gap: "40px", backgroundColor: "#E9F0FF", borderRadius: "10px"}}>
        
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
        
        <form onSubmit={handleSubmit} className='flex-1'>
            
          <TextField
            margin="dense"
            id="name"
            label="Your Name"
            type="text"
            fullWidth
            required
          />

          <TextField
            margin="dense"
            id="email"
            label="Your Email"
            type="email"
            fullWidth
            required
          />

          <TextField
            margin="dense"
            id="message"
            label="Your Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            required
          />

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Send
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;
