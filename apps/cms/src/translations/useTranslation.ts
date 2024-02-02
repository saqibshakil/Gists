import { useTranslation } from 'react-i18next';

export type TransType = (key?: string) => string | undefined
export default function (): { t: TransType } {
    const { t } = useTranslation('mops.web.cms')

    return {
        t: (key?: string) => key ? t(key) : undefined
    }
}
