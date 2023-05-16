import { GetStaticPropsResult } from 'next';

import Pricing from '@/components/Pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
// import { Product } from 'types';
import { Need } from '@/types/Need';
import Graph from '@/components/Graph';

interface Props {
  need: Need
}

export default function PricingPage({ need }: Props) {
  // return <Pricing products={products} />;
  return <Graph />;
}

