import { useEffect } from 'react';

export default function AdBanner({ slot, config }: { slot: string, config: any }) {
  useEffect(() => {
    if (config?.adsense?.enabled) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [config]);

  if (!config?.adsense?.enabled) return null;

  return (
    <div className="w-full flex justify-center my-6 overflow-hidden rounded-soft bg-white/5 p-4 border border-white/5">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={config.adsense.clientId}
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
