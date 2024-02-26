const countryAndCode = [
  { label: '+93 - Afghanistan', value: '+93', name: 'Afghanistan', flag: 'AF' },
  { label: '+355 - Albania', value: '+355', name: 'Albania', flag: 'AL' },
  { label: '+213 - Algeria', value: '+213', name: 'Algeria', flag: 'DZ' },
  {
    label: '+1 684 - American Samoa',
    value: '+1 684',
    name: 'American Samoa',
    flag: 'AS',
  },
  { label: '+376 - Andorra', value: '+376', name: 'Andorra', flag: 'AD' },
  { label: '+244 - Angola', value: '+244', name: 'Angola', flag: 'AO' },
  { label: '+1 264 - Anguilla', value: '+1 264', name: 'Anguilla', flag: 'AI' },
  {
    label: '+1 268 - Antigua and Barbuda',
    value: '+1 268',
    name: 'Antigua and Barbuda',
    flag: 'AG',
  },
  { label: '+54 - Argentina', value: '+54', name: 'Argentina', flag: 'AR' },
  { label: '+374 - Armenia', value: '+374', name: 'Armenia', flag: 'AM' },
  { label: '+297 - Aruba', value: '+297', name: 'Aruba', flag: 'AW' },
  { label: '+61 - Australia', value: '+61', name: 'Australia', flag: 'AU' },
  { label: '+43 - Austria', value: '+43', name: 'Austria', flag: 'AT' },
  { label: '+994 - Azerbaijan', value: '+994', name: 'Azerbaijan', flag: 'AZ' },
  { label: '+1 242 - Bahamas', value: '+1 242', name: 'Bahamas', flag: 'BS' },
  { label: '+973 - Bahrain', value: '+973', name: 'Bahrain', flag: 'BH' },
  { label: '+880 - Bangladesh', value: '+880', name: 'Bangladesh', flag: 'BD' },
  { label: '+1 246 - Barbados', value: '+1 246', name: 'Barbados', flag: 'BB' },
  { label: '+375 - Belarus', value: '+375', name: 'Belarus', flag: 'BY' },
  { label: '+32 - Belgium', value: '+32', name: 'Belgium', flag: 'BE' },
  { label: '+501 - Belize', value: '+501', name: 'Belize', flag: 'BZ' },
  { label: '+229 - Benin', value: '+229', name: 'Benin', flag: 'BJ' },
  { label: '+1 441 - Bermuda', value: '+1 441', name: 'Bermuda', flag: 'BM' },
  { label: '+975 - Bhutan', value: '+975', name: 'Bhutan', flag: 'BT' },
  { label: '+591 - Bolivia', value: '+591', name: 'Bolivia', flag: 'BO' },
  {
    label: '+387 - Bosnia and Herzegovina',
    value: '+387',
    name: 'Bosnia and Herzegovina',
    flag: 'BA',
  },
  { label: '+267 - Botswana', value: '+267', name: 'Botswana', flag: 'BW' },
  { label: '+55 - Brazil', value: '+55', name: 'Brazil', flag: 'BR' },
  {
    label: '+246 - British Indian Ocean Territory',
    value: '+246',
    name: 'British Indian Ocean Territory',
    flag: 'IO',
  },
  {
    label: '+1 284 - British Virgin Islands',
    value: '+1 284',
    name: 'British Virgin Islands',
    flag: 'VG',
  },
  { label: '+673 - Brunei', value: '+673', name: 'Brunei', flag: 'BN' },
  { label: '+359 - Bulgaria', value: '+359', name: 'Bulgaria', flag: 'BG' },
  {
    label: '+226 - Burkina Faso',
    value: '+226',
    name: 'Burkina Faso',
    flag: 'BF',
  },
  { label: '+257 - Burundi', value: '+257', name: 'Burundi', flag: 'BI' },
  { label: '+855 - Cambodia', value: '+855', name: 'Cambodia', flag: 'KH' },
  { label: '+237 - Cameroon', value: '+237', name: 'Cameroon', flag: 'CM' },
  { label: '+1 - Canada', value: '+1', name: 'Canada', flag: 'CA' },
  { label: '+238 - Cape Verde', value: '+238', name: 'Cape Verde', flag: 'CV' },
  {
    label: '+ 345 - Cayman Islands',
    value: '+ 345',
    name: 'Cayman Islands',
    flag: 'KY',
  },
  {
    label: '+236 - Central African Republic',
    value: '+236',
    name: 'Central African Republic',
    flag: 'CF',
  },
  { label: '+235 - Chad', value: '+235', name: 'Chad', flag: 'TD' },
  { label: '+56 - Chile', value: '+56', name: 'Chile', flag: 'CL' },
  { label: '+86 - China', value: '+86', name: 'China', flag: 'CN' },
  {
    label: '+61 - Christmas Island',
    value: '+61',
    name: 'Christmas Island',
    flag: 'CX',
  },
  { label: '+57 - Colombia', value: '+57', name: 'Colombia', flag: 'CO' },
  { label: '+269 - Comoros', value: '+269', name: 'Comoros', flag: 'KM' },
  {
    label: '+682 - Cook Islands',
    value: '+682',
    name: 'Cook Islands',
    flag: 'CK',
  },
  { label: '+506 - Costa Rica', value: '+506', name: 'Costa Rica', flag: 'CR' },
  { label: '+385 - Croatia', value: '+385', name: 'Croatia', flag: 'HR' },
  { label: '+53 - Cuba', value: '+53', name: 'Cuba', flag: 'CU' },
  { label: '+599 - Curacao', value: '+599', name: 'Curacao', flag: 'CW' },
  { label: '+537 - Cyprus', value: '+537', name: 'Cyprus', flag: 'CY' },
  {
    label: '+420 - Czech Republic',
    value: '+420',
    name: 'Czech Republic',
    flag: 'CZ',
  },
  { label: '+45 - Denmark', value: '+45', name: 'Denmark', flag: 'DK' },
  { label: '+253 - Djibouti', value: '+253', name: 'Djibouti', flag: 'DJ' },
  { label: '+1 767 - Dominica', value: '+1 767', name: 'Dominica', flag: 'DM' },
  {
    label: '+1 809 - Dominican Republic',
    value: '+1 809',
    name: 'Dominican Republic',
    flag: 'DO',
  },
  { label: '+670 - East Timor', value: '+670', name: 'East Timor', flag: 'TL' },
  { label: '+593 - Ecuador', value: '+593', name: 'Ecuador', flag: 'EC' },
  { label: '+20 - Egypt', value: '+20', name: 'Egypt', flag: 'EG' },
  {
    label: '+503 - El Salvador',
    value: '+503',
    name: 'El Salvador',
    flag: 'SV',
  },
  {
    label: '+240 - Equatorial Guinea',
    value: '+240',
    name: 'Equatorial Guinea',
    flag: 'GQ',
  },
  { label: '+291 - Eritrea', value: '+291', name: 'Eritrea', flag: 'ER' },
  { label: '+372 - Estonia', value: '+372', name: 'Estonia', flag: 'EE' },
  { label: '+251 - Ethiopia', value: '+251', name: 'Ethiopia', flag: 'ET' },
  {
    label: '+500 - Falkland Islands',
    value: '+500',
    name: 'Falkland Islands',
    flag: 'FK',
  },
  {
    label: '+298 - Faroe Islands',
    value: '+298',
    name: 'Faroe Islands',
    flag: 'FO',
  },
  { label: '+679 - Fiji', value: '+679', name: 'Fiji', flag: 'FJ' },
  { label: '+358 - Finland', value: '+358', name: 'Finland', flag: 'FI' },
  { label: '+33 - France', value: '+33', name: 'France', flag: 'FR' },
  {
    label: '+594 - French Guiana',
    value: '+594',
    name: 'French Guiana',
    flag: 'GF',
  },
  {
    label: '+689 - French Polynesia',
    value: '+689',
    name: 'French Polynesia',
    flag: 'PF',
  },
  { label: '+241 - Gabon', value: '+241', name: 'Gabon', flag: 'GA' },
  { label: '+220 - Gambia', value: '+220', name: 'Gambia', flag: 'GM' },
  { label: '+995 - Georgia', value: '+995', name: 'Georgia', flag: 'GE' },
  { label: '+49 - Germany', value: '+49', name: 'Germany', flag: 'DE' },
  { label: '+233 - Ghana', value: '+233', name: 'Ghana', flag: 'GH' },
  { label: '+350 - Gibraltar', value: '+350', name: 'Gibraltar', flag: 'GI' },
  { label: '+30 - Greece', value: '+30', name: 'Greece', flag: 'GR' },
  { label: '+299 - Greenland', value: '+299', name: 'Greenland', flag: 'GL' },
  { label: '+1 473 - Grenada', value: '+1 473', name: 'Grenada', flag: 'GD' },
  { label: '+590 - Guadeloupe', value: '+590', name: 'Guadeloupe', flag: 'GP' },
  { label: '+1 671 - Guam', value: '+1 671', name: 'Guam', flag: 'GU' },
  { label: '+502 - Guatemala', value: '+502', name: 'Guatemala', flag: 'GT' },
  { label: '+224 - Guinea', value: '+224', name: 'Guinea', flag: 'GN' },
  {
    label: '+245 - Guinea-Bissau',
    value: '+245',
    name: 'Guinea-Bissau',
    flag: 'GW',
  },
  { label: '+595 - Guyana', value: '+595', name: 'Guyana', flag: 'GY' },
  { label: '+509 - Haiti', value: '+509', name: 'Haiti', flag: 'HT' },
  { label: '+504 - Honduras', value: '+504', name: 'Honduras', flag: 'HN' },
  { label: '+36 - Hungary', value: '+36', name: 'Hungary', flag: 'HU' },
  { label: '+354 - Iceland', value: '+354', name: 'Iceland', flag: 'IS' },
  { label: '+91 - India', value: '+91', name: 'India', flag: 'IN' },
  { label: '+62 - Indonesia', value: '+62', name: 'Indonesia', flag: 'ID' },
  { label: '+98 - Iran', value: '+98', name: 'Iran', flag: 'IR' },
  { label: '+964 - Iraq', value: '+964', name: 'Iraq', flag: 'IQ' },
  { label: '+353 - Ireland', value: '+353', name: 'Ireland', flag: 'IE' },
  { label: '+972 - Israel', value: '+972', name: 'Israel', flag: 'IL' },
  { label: '+39 - Italy', value: '+39', name: 'Italy', flag: 'IT' },
  {
    label: '+225 - Ivory Coast',
    value: '+225',
    name: 'Ivory Coast',
    flag: 'CI',
  },
  { label: '+1 876 - Jamaica', value: '+1 876', name: 'Jamaica', flag: 'JM' },
  { label: '+81 - Japan', value: '+81', name: 'Japan', flag: 'JP' },
  { label: '+962 - Jordan', value: '+962', name: 'Jordan', flag: 'JO' },
  { label: '+7 7 - Kazakhstan', value: '+7 7', name: 'Kazakhstan', flag: 'KZ' },
  { label: '+254 - Kenya', value: '+254', name: 'Kenya', flag: 'KE' },
  { label: '+686 - Kiribati', value: '+686', name: 'Kiribati', flag: 'KI' },
  { label: '+965 - Kuwait', value: '+965', name: 'Kuwait', flag: 'KW' },
  { label: '+996 - Kyrgyzstan', value: '+996', name: 'Kyrgyzstan', flag: 'KG' },
  { label: '+856 - Laos', value: '+856', name: 'Laos', flag: 'LA' },
  { label: '+371 - Latvia', value: '+371', name: 'Latvia', flag: 'LV' },
  { label: '+961 - Lebanon', value: '+961', name: 'Lebanon', flag: 'LB' },
  { label: '+266 - Lesotho', value: '+266', name: 'Lesotho', flag: 'LS' },
  { label: '+231 - Liberia', value: '+231', name: 'Liberia', flag: 'LR' },
  { label: '+218 - Libya', value: '+218', name: 'Libya', flag: 'LY' },
  {
    label: '+423 - Liechtenstein',
    value: '+423',
    name: 'Liechtenstein',
    flag: 'LI',
  },
  { label: '+370 - Lithuania', value: '+370', name: 'Lithuania', flag: 'LT' },
  { label: '+352 - Luxembourg', value: '+352', name: 'Luxembourg', flag: 'LU' },
  { label: '+389 - Macedonia', value: '+389', name: 'Macedonia', flag: 'MK' },
  { label: '+261 - Madagascar', value: '+261', name: 'Madagascar', flag: 'MG' },
  { label: '+265 - Malawi', value: '+265', name: 'Malawi', flag: 'MW' },
  { label: '+60 - Malaysia', value: '+60', name: 'Malaysia', flag: 'MY' },
  { label: '+960 - Maldives', value: '+960', name: 'Maldives', flag: 'MV' },
  { label: '+223 - Mali', value: '+223', name: 'Mali', flag: 'ML' },
  { label: '+356 - Malta', value: '+356', name: 'Malta', flag: 'MT' },
  {
    label: '+692 - Marshall Islands',
    value: '+692',
    name: 'Marshall Islands',
    flag: 'MH',
  },
  { label: '+596 - Martinique', value: '+596', name: 'Martinique', flag: 'MQ' },
  { label: '+222 - Mauritania', value: '+222', name: 'Mauritania', flag: 'MR' },
  { label: '+230 - Mauritius', value: '+230', name: 'Mauritius', flag: 'MU' },
  { label: '+262 - Mayotte', value: '+262', name: 'Mayotte', flag: 'YT' },
  { label: '+52 - Mexico', value: '+52', name: 'Mexico', flag: 'MX' },
  { label: '+691 - Micronesia', value: '+691', name: 'Micronesia', flag: 'FM' },
  { label: '+373 - Moldova', value: '+373', name: 'Moldova', flag: 'MD' },
  { label: '+377 - Monaco', value: '+377', name: 'Monaco', flag: 'MC' },
  { label: '+976 - Mongolia', value: '+976', name: 'Mongolia', flag: 'MN' },
  { label: '+382 - Montenegro', value: '+382', name: 'Montenegro', flag: 'ME' },
  {
    label: '+1664 - Montserrat',
    value: '+1664',
    name: 'Montserrat',
    flag: 'MS',
  },
  { label: '+212 - Morocco', value: '+212', name: 'Morocco', flag: 'MA' },
  { label: '+95 - Myanmar', value: '+95', name: 'Myanmar', flag: 'MM' },
  { label: '+264 - Namibia', value: '+264', name: 'Namibia', flag: 'NA' },
  { label: '+674 - Nauru', value: '+674', name: 'Nauru', flag: 'NR' },
  { label: '+977 - Nepal', value: '+977', name: 'Nepal', flag: 'NP' },
  { label: '+31 - Netherlands', value: '+31', name: 'Netherlands', flag: 'NL' },
  {
    label: '+687 - New Caledonia',
    value: '+687',
    name: 'New Caledonia',
    flag: 'NC',
  },
  { label: '+64 - New Zealand', value: '+64', name: 'New Zealand', flag: 'NZ' },
  { label: '+505 - Nicaragua', value: '+505', name: 'Nicaragua', flag: 'NI' },
  { label: '+227 - Niger', value: '+227', name: 'Niger', flag: 'NE' },
  { label: '+234 - Nigeria', value: '+234', name: 'Nigeria', flag: 'NG' },
  { label: '+683 - Niue', value: '+683', name: 'Niue', flag: 'NU' },
  {
    label: '+672 - Norfolk Island',
    value: '+672',
    name: 'Norfolk Island',
    flag: 'NF',
  },
  {
    label: '+850 - North Korea',
    value: '+850',
    name: 'North Korea',
    flag: 'KP',
  },
  {
    label: '+1 670 - Northern Mariana Islands',
    value: '+1 670',
    name: 'Northern Mariana Islands',
    flag: 'MP',
  },
  { label: '+47 - Norway', value: '+47', name: 'Norway', flag: 'NO' },
  { label: '+968 - Oman', value: '+968', name: 'Oman', flag: 'OM' },
  { label: '+92 - Pakistan', value: '+92', name: 'Pakistan', flag: 'PK' },
  { label: '+680 - Palau', value: '+680', name: 'Palau', flag: 'PW' },
  {
    label: '+970 - Palestinian Territory',
    value: '+970',
    name: 'Palestinian Territory',
    flag: 'PS',
  },
  { label: '+507 - Panama', value: '+507', name: 'Panama', flag: 'PA' },
  {
    label: '+675 - Papua New Guinea',
    value: '+675',
    name: 'Papua New Guinea',
    flag: 'PG',
  },
  { label: '+595 - Paraguay', value: '+595', name: 'Paraguay', flag: 'PY' },
  { label: '+51 - Peru', value: '+51', name: 'Peru', flag: 'PE' },
  { label: '+63 - Philippines', value: '+63', name: 'Philippines', flag: 'PH' },
  { label: '+48 - Poland', value: '+48', name: 'Poland', flag: 'PL' },
  { label: '+351 - Portugal', value: '+351', name: 'Portugal', flag: 'PT' },
  {
    label: '+1 787 - Puerto Rico',
    value: '+1 787',
    name: 'Puerto Rico',
    flag: 'PR',
  },
  { label: '+974 - Qatar', value: '+974', name: 'Qatar', flag: 'QA' },
  { label: '+262 - Reunion', value: '+262', name: 'Reunion', flag: 'RE' },
  { label: '+40 - Romania', value: '+40', name: 'Romania', flag: 'RO' },
  { label: '+7 - Russia', value: '+7', name: 'Russia', flag: 'RU' },
  { label: '+250 - Rwanda', value: '+250', name: 'Rwanda', flag: 'RW' },
  { label: '+685 - Samoa', value: '+685', name: 'Samoa', flag: 'WS' },
  { label: '+378 - San Marino', value: '+378', name: 'San Marino', flag: 'SM' },
  {
    label: '+966 - Saudi Arabia',
    value: '+966',
    name: 'Saudi Arabia',
    flag: 'SA',
  },
  { label: '+221 - Senegal', value: '+221', name: 'Senegal', flag: 'SN' },
  { label: '+381 - Serbia', value: '+381', name: 'Serbia', flag: 'RS' },
  { label: '+248 - Seychelles', value: '+248', name: 'Seychelles', flag: 'SC' },
  {
    label: '+232 - Sierra Leone',
    value: '+232',
    name: 'Sierra Leone',
    flag: 'SL',
  },
  { label: '+65 - Singapore', value: '+65', name: 'Singapore', flag: 'SG' },
  { label: '+421 - Slovakia', value: '+421', name: 'Slovakia', flag: 'SK' },
  { label: '+386 - Slovenia', value: '+386', name: 'Slovenia', flag: 'SI' },
  {
    label: '+677 - Solomon Islands',
    value: '+677',
    name: 'Solomon Islands',
    flag: 'SB',
  },
  {
    label: '+27 - South Africa',
    value: '+27',
    name: 'South Africa',
    flag: 'ZA',
  },
  {
    label: '+500 - South Georgia and the South Sandwich Islands',
    value: '+500',
    name: 'South Georgia and the South Sandwich Islands',
    flag: 'GS',
  },
  { label: '+82 - South Korea', value: '+82', name: 'South Korea', flag: 'KR' },
  { label: '+34 - Spain', value: '+34', name: 'Spain', flag: 'ES' },
  { label: '+94 - Sri Lanka', value: '+94', name: 'Sri Lanka', flag: 'LK' },
  { label: '+249 - Sudan', value: '+249', name: 'Sudan', flag: 'SD' },
  { label: '+597 - Suriname', value: '+597', name: 'Suriname', flag: 'SR' },
  { label: '+268 - Swaziland', value: '+268', name: 'Swaziland', flag: 'SZ' },
  { label: '+46 - Sweden', value: '+46', name: 'Sweden', flag: 'SE' },
  { label: '+41 - Switzerland', value: '+41', name: 'Switzerland', flag: 'CH' },
  { label: '+963 - Syria', value: '+963', name: 'Syria', flag: 'SY' },
  { label: '+886 - Taiwan', value: '+886', name: 'Taiwan', flag: 'TW' },
  { label: '+992 - Tajikistan', value: '+992', name: 'Tajikistan', flag: 'TJ' },
  { label: '+255 - Tanzania', value: '+255', name: 'Tanzania', flag: 'TZ' },
  { label: '+66 - Thailand', value: '+66', name: 'Thailand', flag: 'TH' },
  { label: '+228 - Togo', value: '+228', name: 'Togo', flag: 'TG' },
  { label: '+690 - Tokelau', value: '+690', name: 'Tokelau', flag: 'TK' },
  { label: '+676 - Tonga', value: '+676', name: 'Tonga', flag: 'TO' },
  {
    label: '+1 868 - Trinidad and Tobago',
    value: '+1 868',
    name: 'Trinidad and Tobago',
    flag: 'TT',
  },
  { label: '+216 - Tunisia', value: '+216', name: 'Tunisia', flag: 'TN' },
  { label: '+90 - Turkey', value: '+90', name: 'Turkey', flag: 'TR' },
  {
    label: '+993 - Turkmenistan',
    value: '+993',
    name: 'Turkmenistan',
    flag: 'TM',
  },
  {
    label: '+1 649 - Turks and Caicos Islands',
    value: '+1 649',
    name: 'Turks and Caicos Islands',
    flag: 'TC',
  },
  { label: '+688 - Tuvalu', value: '+688', name: 'Tuvalu', flag: 'TV' },
  {
    label: '+1 340 - U.S. Virgin Islands',
    value: '+1 340',
    name: 'U.S. Virgin Islands',
    flag: 'VI',
  },
  { label: '+256 - Uganda', value: '+256', name: 'Uganda', flag: 'UG' },
  { label: '+380 - Ukraine', value: '+380', name: 'Ukraine', flag: 'UA' },
  {
    label: '+971 - United Arab Emirates',
    value: '+971',
    name: 'United Arab Emirates',
    flag: 'AE',
  },
  {
    label: '+44 - United Kingdom',
    value: '+44',
    name: 'United Kingdom',
    flag: 'GB',
  },
  {
    label: '+1 - United States',
    value: '+1',
    name: 'United States',
    flag: 'US',
  },
  { label: '+598 - Uruguay', value: '+598', name: 'Uruguay', flag: 'UY' },
  { label: '+998 - Uzbekistan', value: '+998', name: 'Uzbekistan', flag: 'UZ' },
  { label: '+678 - Vanuatu', value: '+678', name: 'Vanuatu', flag: 'VU' },
  { label: '+58 - Venezuela', value: '+58', name: 'Venezuela', flag: 'VE' },
  { label: '+84 - Vietnam', value: '+84', name: 'Vietnam', flag: 'VN' },
  {
    label: '+681 - Wallis and Futuna',
    value: '+681',
    name: 'Wallis and Futuna',
    flag: 'WF',
  },
  { label: '+967 - Yemen', value: '+967', name: 'Yemen', flag: 'YE' },
  { label: '+260 - Zambia', value: '+260', name: 'Zambia', flag: 'ZM' },
  { label: '+263 - Zimbabwe', value: '+263', name: 'Zimbabwe', flag: 'ZW' },
];

export default countryAndCode;