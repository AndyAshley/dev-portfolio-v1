import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import ContentContainer from "@/components/ui/content-container";
import { packages, additionalServices } from "./section-data";

export default function Services() {
  return (
    <>
      <section className="max-w-lg mx-auto my-auto h-full flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h1>
              Development Services
              <span className="block h-[1px] bg-ember-500 w-[100px] mx-auto my-2 lg:hidden"></span>
              <span className="block relative text-lg before:absolute before:top-1/2 before:left-0.5 before:h-[1px] lg:before:bg-ember-500 before:w-[100px]">
                Real Solutions for Real Businesses
              </span>
            </h1>
          </div>

          <h2 className="mt-10 text-center">
            Practical websites. Local support. Real solutions.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 px-4 py-8 lg:mt-10">
          {packages.map((pkg) => (
            <ContentContainer
              key={pkg.title}
              className={`flex flex-col justify-between h-full relative transition-transform ${
                pkg.badge ? "lg:scale-[1.05]" : ""
              }`}
              borderColor={
                pkg.badge ? "border-[#f54236]/80" : "border-zinc-700/80"
              }
            >
              {/* Badge */}
              {pkg.badge && (
                <div
                  className="absolute top-4 right-4 sm:top-8 sm:right-4 lg:-top-5 lg:left-4 lg:right-0
                  text-xs font-semibold uppercase text-ember-500
                  bg-zinc-900 rounded-sm border border-ember-400
                  shadow-md tracking-wide p-2 w-fit"
                >
                  {pkg.badge}
                </div>
              )}

              {/* Title & Price */}
              <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
              <p className="text-lg font-medium text-ember-500 mt-1 h-[32px]">
                {pkg.price}
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-300 mt-2 mb-4 min-h-[48px]">
                {pkg.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-2 text-sm text-zinc-200 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ember-400 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <LinkButton
                  className="ms-auto"
                  mode={pkg.badge ? "primary" : "secondary"}
                  href="/contact"
                >
                  Learn More
                </LinkButton>
              </div>
            </ContentContainer>
          ))}
        </div>
        <div className="text-center flex flex-col gap-2 mt-10">
          <h2>Looking for something else?</h2>
          <p>Application Development and Custom Solutions</p>
          <p className="text-sm text-zinc-300 min-h-[48px] -mb-5 border-b border-zinc-700/80 pb-5">
            I can help with custom applications, internal tools, or anything
            else you might need. Let's talk about your ideas and see how I can
            help.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 px-4 py-8">
          {additionalServices.map((pkg) => (
            <ContentContainer
              key={pkg.title}
              className="flex flex-col justify-between h-full relative"
              borderColor="border-zinc-700/80"
            >
              {/* Title & Price */}
              <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
              <p className="text-lg font-medium text-ember-500 mt-1 h-[32px]">
                {pkg.price}
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-300 mt-2 mb-4 min-h-[48px]">
                {pkg.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-2 text-sm text-zinc-200 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-ember-400 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <LinkButton
                  className="ms-auto"
                  mode="secondary"
                  href="/contact"
                >
                  Learn More
                </LinkButton>
              </div>
            </ContentContainer>
          ))}
        </div>
      </section>
    </>
  );
}
