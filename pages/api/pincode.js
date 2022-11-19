// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  let pincodes = {
    "44600": ["Kathmandu", "Bagmati"],
    "44800": ["Bhaktapur", "Bagmati"],
    "44700": ["Lalitpur", "Bagmati"],
    "33700": ["Kaski", "Gandaki"],
  }

  res.status(200).json(pincodes);
}
