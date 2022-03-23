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

import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Divider } from '@mui/material';

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
    coverPhoto: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });
  
  const defaultValues = useMemo(
    () => ({
      name: currentChannel?.name || '',
      type: currentChannel?.type || '',
      status: currentChannel?.status || '',
      coverPhoto: currentChannel?.coverPhoto || '',
      isVerified: currentChannel?.isVerified || true,
      activeEmail: currentChannel?.activeEmail,
      activeSMS: currentChannel?.activeSMS,
      activeWhatsapp: currentChannel?.activeWhatsapp,
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
    setValue,
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(`${PATH_CHANNEL.root}/${paramCase(currentChannel.name)}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'coverPhoto',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          
          <Card sx={{ py: isDesktop? 10: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}
             {!isDesktop && (
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <IconButtonAnimate>
                    <Iconify icon={'eva:arrow-back-outline'} width={22} height={22} />
                  </IconButtonAnimate>
                </Box>
                </Box>
              )}
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="coverPhoto"
                accept="image/*"
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> 
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
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
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
  
            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
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
                  <option value="normal">Normal</option>
                  <option value="individual">Individual</option>
                  <option value="normalSub">Normal - Sub Channel</option>
                  <option value="individualSub">Individual - Sub Channel</option>
              </RHFSelect>
          
            </Box>

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
        </Grid>
      </Grid>
    </FormProvider>
  );
}
