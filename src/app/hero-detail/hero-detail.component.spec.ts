import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivedRoute = {
            snapshot: { paramMap: { get: () => '3'}}
        };
        mockHeroService = jasmine.createSpyObj( [ 'getHero', 'updateHero' ] );
        mockLocation = jasmine.createSpyObj ( [ 'back' ] );

        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ HeroDetailComponent ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
             ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });
});
