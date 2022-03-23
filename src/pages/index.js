import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/dashboard/one');
    }
  });

  return null;
}
