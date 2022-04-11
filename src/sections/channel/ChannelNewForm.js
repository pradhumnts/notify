import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';

import { Box, Card, Stack, Switch, Typography, FormControlLabel, Divider, TextareaAutosize, Container } from '@mui/material';

// routes
import { PATH_CHANNEL} from '../../routes/paths';

// components
import Label from '../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';
// hooks
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/Iconify';

import { IconButtonAnimate } from '../../components/animate';
import { paramCase } from 'change-case';
// ----------------------------------------------------------------------
import axios from '../../utils/axios'


ChannelNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentChannel: PropTypes.object,
};

export default function ChannelNewForm({ isEdit = false, currentChannel }) {
  const { push } = useRouter();
  const isDesktop = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const NewChannelSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Channel Type is required'),
    description: Yup.string().required('Description is required'),
  });
  
  const defaultValues = useMemo(
    () => ({
      name: currentChannel?.name || '',
      type: currentChannel?.type || '',
      description: currentChannel?.description || '',
      isActive: currentChannel?.isActive || false,
      activeEmail: currentChannel?.activeEmail || true,
      activeSMS: currentChannel?.activeSMS || true,
      activeWhatsapp: currentChannel?.activeWhatsapp || true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentChannel]
  );
  
  const methods = useForm({
    resolver: yupResolver(NewChannelSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentChannel) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentChannel]);

  const onSubmit = async () => {

    try {
      await axios.post("http://127.0.0.1:8000/channels/new/", values, {
        headers: {
          "accept": "application/json",
          "Authorization": `JWT ${localStorage.getItem('token')}`,
        }
      })

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // push(`${PATH_CHANNEL.root}/${paramCase(currentChannel.name)}`);
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error);
    }
  };
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        

          <Card sx={{ p: 3,  }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Channel Name" />
              
              <RHFSelect name="type" label="Channel Type" placeholder="Channel Type">
                  <option value="" />
                  <option value="Normal">Normal</option>
                  <option value="Individual">Individual</option>
              </RHFSelect>
          
            </Box>
            
            <RHFTextField name="description" sx={{ mt:3 }} label="Description" />

            <Divider sx={{ my: 4 }}/>
            <Stack sx={{ rowGap: 3 }}>
            <RHFSwitch
              name="activeEmail"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email 
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Disabling this will stop all channel emails for participants
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
             <RHFSwitch
              name="activeSMS"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    SMS
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Disabling this will stop all channel SMS messages for participants
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
             <RHFSwitch
              name="activeWhatsapp"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Whatsapp
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will stop all channel whatsapp messages for participants
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
            </Stack>
           
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Channel' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
   
          <Card sx={{ p: 3, display: isDesktop ? 'flex' : "", alignItems: isDesktop ? 'center' : "", mt: 2}}>
                 <FormControlLabel
                   labelPlacement="start"
                   control={
                     <Controller
                       name="isActive"
                       control={control}
                       render={({ field }) => (
                         <Switch
                           {...field}
                           checked={field.value !== 'disabled'}
                           onChange={(event) => field.onChange(event.target.checked ? 'active' : 'disabled')}
                         />
                       )}
                     />
                   }
                   label={
                     <>
                       <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                         Active
                       </Typography>
                       
                       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Disabling this will stop all the scheduled tasks and messages of this channel.
                       </Typography>
                     </>
                   }
                   sx={{ mr: 5, ml: 0, width: 1, justifyContent: 'space-between' }}
                 />
                 {isDesktop && 
               <Label
                 color={values.isActive !== 'active' ? 'error' : 'success'}
                 sx={{ textTransform: 'uppercase' }}>
                 { values.isActive === 'active' ? 'active' : 'disabled' }
               </Label>
                }
             </Card>
      
    </FormProvider>
  );
}
