import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material'
// form
import { useForm } from 'react-hook-form';

// @mui
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from './hook-form';

RemoveParticipantDialog.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}

export default function RemoveParticipantDialog ({ currentUser, open, handleClose, isEdit = false }) {
   
    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email(),
        phoneNumber: Yup.string().required('Phone number is required'),
    });
    
    const defaultValues = useMemo(
        () => ({
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          phoneNumber: currentUser?.phoneNumber || '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
      );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;
    
      useEffect(() => {
        if (isEdit && currentUser) {
          reset(defaultValues);
        }
        if (!isEdit) {
          reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isEdit, currentUser]);
      
    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            handleClose();
        } catch (error) {
        console.error(error);
        }
    };

  return (
    <Dialog open={open} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        
            <DialogTitle>{isEdit ? currentUser.name: "Add New Participant"}</DialogTitle>

            <DialogContent>
            
            <DialogContentText>
                Please enter details of participant, to activate Whatsapp updates please add member's Whatsapp phone number.
            </DialogContentText>
            <Stack sx={{ rowGap: 3, mt:3.4 }}>
                <RHFTextField name="name" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="phoneNumber" label="Phone Number" />        
            </Stack>
            </DialogContent>
            <DialogActions>
            {isEdit && <Button color="error" onClick={handleClose} variant="contained">
                Remove Participant
            </Button>
            }
           
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Channel' : 'Save Changes'}
            </LoadingButton>
            </DialogActions>
        </FormProvider>
      </Dialog>
  )
}
